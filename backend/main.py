# main.py
from fastapi import FastAPI
import hashlib

app = FastAPI()

db = {}

@app.post("/shorten")
def shorten(url: dict):
    original = url["original_url"]
    short = hashlib.md5(original.encode()).hexdigest()[:6]
    db[short] = original
    return {"short_url": f"http://localhost:5000/{short}"}

@app.get("/{short}")
def redirect(short: str):
    return {"redirect_to": db.get(short, "Not found")}