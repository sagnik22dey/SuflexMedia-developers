from datetime import datetime
import json
from pathlib import Path
from typing import List, Optional
import csv
import io
from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse, Response
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from pydantic import BaseModel, EmailStr, Field

app = FastAPI(title="SuflexMedia Studio", docs_url=None, redoc_url=None)

BASE_DIR = Path(__file__).resolve().parent
ROOT_DIR = BASE_DIR.parent
app.mount("/static", StaticFiles(directory=ROOT_DIR / "static"), name="static")
templates = Jinja2Templates(directory=ROOT_DIR / "templates")

LEADS_FILE = ROOT_DIR / "data" / "leads.json"
LEADS_FILE.parent.mkdir(exist_ok=True)


class Lead(BaseModel):
    """Lead schema for architecture quote briefs and client inquiries."""
    name: str = Field(min_length=2, max_length=100)
    email: EmailStr
    phone: str = Field(min_length=7, max_length=25)
    service: str = Field(min_length=2, max_length=100)
    modules: Optional[str] = Field(default="")
    budget: Optional[str] = Field(default="")
    message: Optional[str] = Field(default="", max_length=2500)


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
