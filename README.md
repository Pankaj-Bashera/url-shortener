# INT377 — Auto-Scaling URL Shortener: Cloud & DevOps Capstone

## Project Structure

```
url-shortener/
├── backend/
│   ├── main.py              # FastAPI application
│   ├── database.py          # SQLite setup
│   ├── requirements.txt     # Python dependencies
│   └── tests/
│       └── test_main.py     # Pytest test suite
├── frontend/
│   └── index.html           # Web UI
├── k8s/
│   ├── deployment.yaml      # Kubernetes Deployment
│   ├── service.yaml         # Kubernetes Service (NodePort)
│   └── hpa.yaml             # Horizontal Pod Autoscaler
├── infra/
│   ├── main.tf              # Terraform — AWS EC2 + Security Group
│   ├── variables.tf         # Input variable definitions
│   └── outputs.tf           # Output values
├── monitoring/
│   └── prometheus.yml       # Prometheus scrape config
├── Dockerfile               # Container image definition
├── docker-compose.yml       # Local full-stack (app + Prometheus + Grafana)
├── Jenkinsfile              # CI/CD pipeline definition
└── .gitignore
```

---

## Stage 1 — Run Locally (No Docker)

> **Prerequisites:** Python 3.11+ and Node.js installed.

```bash
# 1. Build the frontend
cd frontend
npm install
npm run build
cd ..

# 2. Install backend dependencies
cd backend
pip install -r requirements.txt

# 3. Start the API server
uvicorn main:app --host 0.0.0.0 --port 5000 --reload

# 4. Run tests
python -m pytest tests/ -v

# 4. Test the API
curl -X POST http://localhost:5000/shorten -H "Content-Type: application/json"  -d '{"original_url": "https://google.com"}'

# Returns: {"short_id": "ab12cd", "short_url": "http://localhost:5000/ab12cd"}

# 5. Visit the short URL in a browser or curl (follow redirect):
curl -L http://localhost:5000/ab12cd
```

---

## Stage 2 — Git Workflow

```bash
# Configure Git identity
git config --global user.name  "Your Name"
git config --global user.email "you@example.com"

# Initialize repo and link to GitHub
git init
git remote add origin https://github.com/<username>/url-shortener.git

# Daily workflow
git status
git add .
git commit -m "feat: initial project setup"
git push origin main

# Feature branch workflow
git checkout -b feature/shorten-api
# ... develop ...
git add . && git commit -m "feat: add shorten endpoint"
git push origin feature/shorten-api
git checkout main && git merge feature/shorten-api && git push origin main
```

---

## Stage 3 — Docker

> **Prerequisites:** Docker Desktop or Docker Engine installed.

```bash
# Build the image
docker build -t url-shortener .

# Run the container
docker run -p 5000:5000 url-shortener

# Common commands
docker images                         # list images
docker ps                             # list running containers
docker stop <container_id>            # stop container
docker logs <container_id>            # view logs
docker exec -it <container_id> bash   # shell inside container

# Push to Docker Hub (replace <user>)
docker tag url-shortener <user>/url-shortener:latest
docker login
docker push <user>/url-shortener:latest
```

---

## Stage 4 — Kubernetes (Minikube)

> **Prerequisites:** Minikube + kubectl installed.

```bash
# Start Minikube
minikube start --driver=docker
minikube addons enable metrics-server

# IMPORTANT: Replace <dockerhub-username> in k8s/deployment.yaml first!

# Apply manifests
kubectl apply -f k8s/deployment.yaml
kubectl apply -f k8s/service.yaml
kubectl apply -f k8s/hpa.yaml

# Verify
kubectl get pods               
kubectl get deployments
kubectl get services
kubectl get hpa

# Access the app
minikube service url-shortener-service --url

# Test auto-scaling (run in a second terminal)
while true; do curl $(minikube service url-shortener-service --url)/health; done

# Watch scaling happen
kubectl get hpa --watch
```

---

## Stage 5 — Full Stack with Docker Compose (Local Monitoring)

```bash
# Start app + Prometheus + Grafana
docker compose up -d

# URLs:
#   App:        http://localhost:5000
#   Prometheus: http://localhost:9090
#   Grafana:    http://localhost:3000  (admin / admin)

# Stop everything
docker compose down
```

### Grafana Dashboard Setup
1. Open http://localhost:3000 → Login: `admin` / `admin`
2. **Configuration → Data Sources → Add → Prometheus**
   - URL: `http://prometheus:9090` → Save & Test
3. **+ → New Dashboard → Add Panel**
   - Panel 1 — Request Rate: `rate(http_requests_total[1m])`
   - Panel 2 — Latency p95: `histogram_quantile(0.95, rate(http_request_duration_seconds_bucket[5m]))`
   - Panel 3 — Pod Count: `kube_deployment_status_replicas{deployment="url-shortener"}`
   - Panel 4 — CPU Usage: `rate(process_cpu_seconds_total[1m])`
4. Save as **"URL Shortener - System Health"**

---

## Stage 6 — Jenkins CI/CD Pipeline

> **Prerequisites:** Docker installed.

```bash
# Start Jenkins
docker run -d -p 8080:8080 -p 50000:50000 \
  -v jenkins_home:/var/jenkins_home \
  jenkins/jenkins:lts

# Get initial admin password
docker exec <container_id> cat /var/jenkins_home/secrets/initialAdminPassword

# Open http://localhost:8080 and complete setup

# Add credentials in Jenkins:
#   Manage Jenkins → Credentials → Add:
#     - ID: dockerhub-creds   Type: Username + Password (Docker Hub)
#     - ID: kubeconfig        Type: Secret file  (~/.kube/config)

# In Jenkinsfile, update:
#   - DOCKER_IMAGE with your Docker Hub username
#   - git url with your GitHub repo URL

# Create a Pipeline job pointing to your repo's Jenkinsfile
# Add GitHub webhook: Repo → Settings → Webhooks → http://<jenkins-url>/github-webhook/
```

---

## Stage 7 — Terraform (AWS EC2)

> **Prerequisites:** Terraform CLI + AWS CLI configured (`aws configure`).

```bash
cd infra

# Initialize Terraform (downloads AWS provider)
terraform init

# Preview changes
terraform plan -var="key_pair_name=my-key" -var="docker_image=<user>/url-shortener:latest"

# Apply (creates EC2 + Security Group)
terraform apply -var="key_pair_name=my-key" -var="docker_image=<user>/url-shortener:latest"

# Outputs the public IP → visit http://<ip>
terraform show

# Destroy resources when done (avoid charges)
terraform destroy
```

---

## Quick Verification Checklist

| Stage | Command | Expected Output |
|-------|---------|-----------------|
| Local API | `curl localhost:5000/health` | `{"status":"ok"}` |
| Docker | `docker ps` | url-shortener container running |
| K8s Pods | `kubectl get pods` | 2/2 Running |
| HPA | `kubectl get hpa` | TARGETS shows CPU%, REPLICAS |
| Prometheus | `curl localhost:9090/-/healthy` | Prometheus is Healthy |
| Grafana | Open http://localhost:3000 | Dashboard loads |
| Jenkins | Open http://localhost:8080 | Pipeline stages visible |
| Terraform | `terraform show` | EC2 public IP displayed |
