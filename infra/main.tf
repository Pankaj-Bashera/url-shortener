terraform {
  required_providers {
    aws = { source = "hashicorp/aws", version = "~> 5.0" }
  }
}

provider "aws" {
  region = var.aws_region
}

resource "aws_security_group" "url_sg" {
  name                   = "url-shortener-sg-2"
  description            = "Allow HTTP, SSH, Prometheus, and Grafana"
  revoke_rules_on_delete = true  

  # App (URL Shortener)
  ingress {
    description = "HTTP"
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  # SSH
  ingress {
    description = "SSH"
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  # Prometheus
  ingress {
    description = "Prometheus"
    from_port   = 9090
    to_port     = 9090
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  # Grafana
  ingress {
    description = "Grafana"
    from_port   = 3000
    to_port     = 3000
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    description = "Allow all outbound"
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = { Name = "url-shortener-sg" }
}

resource "aws_instance" "url_shortener_vm" {
  ami                    = "ami-091138d0f0d41ff90"
  instance_type          = "t3.micro"
  key_name               = var.key_pair_name
  vpc_security_group_ids = [aws_security_group.url_sg.id]

  user_data = <<-EOF
    #!/bin/bash
    set -e

    apt update -y
    apt install -y docker.io docker-compose-plugin

    systemctl start docker
    systemctl enable docker

    usermod -aG docker ubuntu
    sleep 10

    mkdir -p /app

    cat > /app/docker-compose.yml <<'COMPOSE'
    version: "3.8"

    services:
      app:
        image: ${var.docker_image}
        ports:
          - "80:5000"
        restart: unless-stopped

      prometheus:
        image: prom/prometheus:latest
        ports:
          - "9090:9090"
        restart: unless-stopped
        volumes:
          - prometheus_data:/prometheus

      grafana:
        image: grafana/grafana:latest
        ports:
          - "3000:3000"
        restart: unless-stopped
        environment:
          - GF_SECURITY_ADMIN_PASSWORD=admin
        volumes:
          - grafana_data:/var/lib/grafana

    volumes:
      prometheus_data:
      grafana_data:
    COMPOSE

    docker compose -f /app/docker-compose.yml up -d
  EOF

  tags = { Name = "url-shortener" }
}
