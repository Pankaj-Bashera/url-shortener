import pytest
from fastapi.testclient import TestClient
import sys, os

sys.path.insert(0, os.path.dirname(os.path.dirname(__file__)))
from main import app

client = TestClient(app)


def test_health():
    response = client.get("/health")
    assert response.status_code == 200
    assert response.json() == {"status": "ok"}


def test_shorten_url():
    response = client.post("/shorten", json={"original_url": "https://google.com"})
    assert response.status_code == 200
    data = response.json()
    assert "short_id" in data
    assert "short_url" in data
    assert len(data["short_id"]) == 6


def test_shorten_same_url_returns_same_id():
    r1 = client.post("/shorten", json={"original_url": "https://example.com"})
    r2 = client.post("/shorten", json={"original_url": "https://example.com"})
    assert r1.json()["short_id"] == r2.json()["short_id"]


def test_redirect_valid_short_id():
    r = client.post("/shorten", json={"original_url": "https://openai.com"})
    short_id = r.json()["short_id"]
    response = client.get(f"/{short_id}", follow_redirects=False)
    assert response.status_code == 307


def test_redirect_invalid_short_id():
    response = client.get("/xxxxxx", follow_redirects=False)
    assert response.status_code == 404
