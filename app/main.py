from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from pydantic import BaseModel, EmailStr, Field
from datetime import datetime
import json
from pathlib import Path

app = FastAPI(title="SuflexMedia Studio", docs_url=None, redoc_url=None)

BASE_DIR = Path(__file__).resolve().parent
ROOT_DIR = BASE_DIR.parent
app.mount("/static", StaticFiles(directory=ROOT_DIR / "static"), name="static")
templates = Jinja2Templates(directory=ROOT_DIR / "templates")

LEADS_FILE = ROOT_DIR / "data" / "leads.json"
LEADS_FILE.parent.mkdir(exist_ok=True)


class Lead(BaseModel):
    name: str = Field(min_length=2, max_length=80)
    email: EmailStr
    phone: str = Field(min_length=7, max_length=20)
    service: str = Field(min_length=2, max_length=60)
    budget: str = ""
    message: str = Field(max_length=2000, default="")


@app.get("/")
async def home(request: Request):
    return templates.TemplateResponse(request, "index.html")


@app.post("/api/leads")
async def create_lead(lead: Lead):
    entry = lead.model_dump()
    entry["submitted_at"] = datetime.utcnow().isoformat() + "Z"
    try:
        leads = json.loads(LEADS_FILE.read_text(encoding="utf-8"))
    except (FileNotFoundError, json.JSONDecodeError):
        leads = []
    leads.append(entry)
    LEADS_FILE.write_text(json.dumps(leads, indent=2), encoding="utf-8")
    return JSONResponse(
        status_code=201,
        content={"ok": True, "message": "Brief received. Our engineering lead will contact you within 24 hours."},
    )


@app.get("/api/health")
async def health():
    return {"status": "ok", "service": "suflexmedia-studio"}
