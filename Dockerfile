# Stage 1: Build frontend assets
FROM node:20-alpine AS build-frontend
WORKDIR /app/frontend
# Copy package files for dependency caching
COPY frontend/package*.json ./
RUN npm install
# Copy frontend source and build
COPY frontend/ ./
RUN npm run build

# Stage 2: Python backend image
FROM python:3.11-slim

# Set working directory inside the container
WORKDIR /app

# Copy dependency list first (layer caching)
COPY backend/requirements.txt ./backend/
RUN pip install --no-cache-dir -r backend/requirements.txt

# Copy application source
COPY backend/ ./backend/

# Copy compiled frontend static files from Stage 1
COPY --from=build-frontend /app/frontend/ ./frontend/

# Expose port 5000
EXPOSE 5000

# Non-root user for security (CIS Docker Benchmark)
RUN adduser --disabled-password --gecos "" appuser
RUN chown -R appuser:appuser /app
USER appuser

WORKDIR /app/backend
# Start the FastAPI server
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "5000"]
