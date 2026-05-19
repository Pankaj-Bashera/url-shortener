from pathlib import Path
import hashlib

from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import RedirectResponse
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel
from prometheus_fastapi_instrumentator import Instrumentator

from database import init_db, get_connection


app = FastAPI(
    title="URL Shortener",
    description="Auto-Scaling URL Shortener - INT377 Capstone"
)


# Initialize DB
init_db()


# Prometheus metrics
Instrumentator().instrument(app).expose(app)


# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class URLRequest(BaseModel):
    original_url: str


@app.get("/health")
def health():
    return {"status": "ok"}


@app.post("/shorten")
def shorten(req: URLRequest, request: Request):

    short_id = hashlib.md5(
        req.original_url.encode(),
        usedforsecurity=False
    ).hexdigest()[:6]

    conn = get_connection()

    conn.execute(
        "INSERT OR IGNORE INTO urls VALUES (?, ?)",
        (short_id, req.original_url)
    )

    conn.commit()
    conn.close()

    base_url = str(request.base_url).rstrip("/")

    return {
        "short_id": short_id,
        "short_url": f"{base_url}/r/{short_id}"
    }


@app.get("/r/{short_id}")
def redirect(short_id: str):

    conn = get_connection()

    row = conn.execute(
        "SELECT original FROM urls WHERE id=?",
        (short_id,)
    ).fetchone()

    conn.close()

    if not row:
        raise HTTPException(
            status_code=404,
            detail="URL not found"
        )

    return RedirectResponse(url=row[0])


# Frontend static files
BASE_DIR = Path(__file__).resolve().parent.parent
FRONTEND_DIR = BASE_DIR / "frontend"

if FRONTEND_DIR.exists():
    app.mount(
        "/",
        StaticFiles(directory=FRONTEND_DIR, html=True),
        name="frontend"
    )