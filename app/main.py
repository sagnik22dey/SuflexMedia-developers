from datetime import datetime
import json
from pathlib import Path
from typing import List, Optional
import csv
import io
import re
from fastapi import FastAPI, Request
from fastapi.exceptions import RequestValidationError
from fastapi.responses import JSONResponse, Response
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from pydantic import BaseModel, EmailStr, Field, field_validator

app = FastAPI(title="SuflexMedia Studio", docs_url=None, redoc_url=None)

BASE_DIR = Path(__file__).resolve().parent
ROOT_DIR = BASE_DIR.parent
app.mount("/static", StaticFiles(directory=ROOT_DIR / "static"), name="static")
templates = Jinja2Templates(directory=ROOT_DIR / "templates")

LEADS_FILE = ROOT_DIR / "data" / "leads.json"
LEADS_FILE.parent.mkdir(exist_ok=True)


class Lead(BaseModel):
    """Lead schema for architecture quote briefs and client inquiries with strict field validation."""
    name: str
    email: EmailStr
    phone: str
    service: str = Field(min_length=2, max_length=100)
    modules: Optional[str] = Field(default="")
    budget: Optional[str] = Field(default="")
    message: Optional[str] = Field(default="", max_length=2500)

    @field_validator("name")
    @classmethod
    def validate_name_field(cls, v: str) -> str:
        """Ensure name has sufficient letters and reasonable format."""
        cleaned = v.strip()
        if len(cleaned) < 2:
            raise ValueError("Founder or organization name must be at least 2 characters.")
        if not re.search(r"[a-zA-Z]", cleaned):
            raise ValueError("Name must contain letters.")
        return cleaned

    @field_validator("email")
    @classmethod
    def validate_email_field(cls, v: EmailStr) -> str:
        """Validate email string strictly against domain pattern."""
        cleaned = str(v).strip().lower()
        pattern = r"^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
        if not re.match(pattern, cleaned):
            raise ValueError("Please provide a valid email address with a valid domain (e.g. name@company.com).")
        return cleaned

    @field_validator("phone")
    @classmethod
    def validate_phone_field(cls, v: str) -> str:
        """Validate mobile number length and digits, rejecting numbers outside 10-13 digits."""
        raw = v.strip()
        digits = re.sub(r"[^\d]", "", raw)
        if len(digits) < 10:
            raise ValueError("Mobile number is too short. Please provide a valid 10-digit mobile number.")
        if len(digits) > 13:
            raise ValueError("Mobile number is too long. Standard numbers should not exceed 10 digits (or 13 digits with country code).")
        if re.match(r"^(\d)\1{9,}$", digits[-10:]):
            raise ValueError("Please provide an authentic mobile number.")
        return raw


@app.exception_handler(RequestValidationError)
async def validation_exception_handler(request: Request, exc: RequestValidationError):
    """Format validation errors into a clean, human-readable error message."""
    errors = exc.errors()
    first_error = errors[0] if errors else {}
    msg = first_error.get("msg", "Invalid input data.")
    if msg.startswith("Value error, "):
        msg = msg.replace("Value error, ", "")
    loc = first_error.get("loc", [])
    field = loc[-1] if loc else "field"
    return JSONResponse(
        status_code=422,
        content={"ok": False, "field": str(field), "detail": msg},
    )


def get_all_leads() -> List[dict]:
    """Read stored leads from the json persistence store."""
    if not LEADS_FILE.exists():
        return []
    try:
        content = LEADS_FILE.read_text(encoding="utf-8")
        if not content.strip():
            return []
        data = json.loads(content)
        if isinstance(data, list):
            return data
        return []
    except (json.JSONDecodeError, OSError):
        return []


def save_all_leads(leads: List[dict]) -> None:
    """Save the updated leads array to the json storage file."""
    LEADS_FILE.write_text(json.dumps(leads, indent=2, ensure_ascii=False), encoding="utf-8")


@app.get("/")
async def home(request: Request):
    """Render the primary landing page."""
    return templates.TemplateResponse(request, "index.html")


@app.get("/thank-you")
async def thank_you(request: Request):
    """Render the post-submission confirmation and portfolio showcase page."""
    return templates.TemplateResponse(request, "thank-you.html")


@app.get("/admin")
async def admin_portal(request: Request):
    """Render the internal submissions and leads administration dashboard."""
    leads = get_all_leads()
    leads_sorted = sorted(leads, key=lambda x: x.get("submitted_at", ""), reverse=True)
    return templates.TemplateResponse(
        request,
        "admin.html",
        {"leads": leads_sorted, "total_leads": len(leads_sorted)},
    )


@app.post("/api/leads")
async def create_lead(lead: Lead):
    """Ingest, timestamp and record incoming project brief submissions."""
    entry = lead.model_dump()
    entry["id"] = f"lead_{int(datetime.utcnow().timestamp() * 1000)}"
    entry["submitted_at"] = datetime.utcnow().strftime("%Y-%m-%d %H:%M:%S UTC")
    leads = get_all_leads()
    leads.append(entry)
    save_all_leads(leads)
    return JSONResponse(
        status_code=201,
        content={
            "ok": True,
            "lead_id": entry["id"],
            "message": "Brief received. Our marketing and engineering team will connect with you within 4 hours.",
        },
    )


@app.get("/api/admin/leads")
async def api_admin_leads():
    """Retrieve all submitted leads in reverse chronological order."""
    leads = get_all_leads()
    leads_sorted = sorted(leads, key=lambda x: x.get("submitted_at", ""), reverse=True)
    return {"ok": True, "count": len(leads_sorted), "leads": leads_sorted}


@app.get("/api/admin/leads/export-csv")
async def export_leads_csv():
    """Generate and stream a CSV file containing all registered lead submissions."""
    leads = get_all_leads()
    leads_sorted = sorted(leads, key=lambda x: x.get("submitted_at", ""), reverse=True)
    output = io.StringIO()
    writer = csv.writer(output)
    writer.writerow(["ID", "Submitted At", "Name", "Email", "Phone", "Target Infrastructure", "Core Modules", "Notes"])
    for item in leads_sorted:
        writer.writerow([
            item.get("id", ""),
            item.get("submitted_at", ""),
            item.get("name", ""),
            item.get("email", ""),
            item.get("phone", ""),
            item.get("service", ""),
            item.get("modules", ""),
            item.get("message", ""),
        ])
    csv_bytes = output.getvalue().encode("utf-8")
    return Response(
        content=csv_bytes,
        media_type="text/csv",
        headers={"Content-Disposition": "attachment; filename=suflex_submissions.csv"},
    )


@app.get("/api/health")
async def health():
    """Service health ping."""
    return {"status": "ok", "service": "suflexmedia-studio"}
