from fastapi import FastAPI, HTTPException
from fastapi.responses import RedirectResponse
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import sqlite3, hashlib
from prometheus_fastapi_instrumentator import Instrumentator
from database import init_db

app = FastAPI(title="URL Shortener", description="Auto-Scaling URL Shortener - INT377 Capstone")


# Initialize DB on startup
init_db()

# Prometheus metrics
Instrumentator().instrument(app).expose(app)


class URLRequest(BaseModel):
    original_url: str


@app.post('/shorten')
def shorten(req: URLRequest):
    short_id = hashlib.md5(req.original_url.encode(), usedforsecurity=False).hexdigest()[:6]
    conn = sqlite3.connect('urls.db')
    conn.execute('INSERT OR IGNORE INTO urls VALUES (?,?)', (short_id, req.original_url))
    conn.commit()
    conn.close()
    return {'short_id': short_id, 'short_url': f'http://localhost:5000/{short_id}'}


@app.get('/health')
def health():
    return {'status': 'ok'}


@app.get('/{short_id}')
def redirect(short_id: str):
    conn = sqlite3.connect('urls.db')
    row = conn.execute('SELECT original FROM urls WHERE id=?', (short_id,)).fetchone()
    conn.close()
    if not row:
        raise HTTPException(status_code=404, detail='URL not found')
    return RedirectResponse(url=row[0])

# Mount static files for frontend after routes
app.mount("/", StaticFiles(directory="../frontend", html=True), name="frontend")
