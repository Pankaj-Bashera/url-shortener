terraform {
  required_providers {
    aws = { source = "hashicorp/aws", version = "~> 5.0" }
  }
}

provider "aws" {
  region = var.aws_region
}

resource "aws_security_group" "url_sg" {
  name        = "url-shortener-sg-2"
  description = "Allow HTTP and SSH"

  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
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
    apt update -y
    apt install -y docker.io

    systemctl start docker
    systemctl enable docker

    usermod -aG docker ubuntu
    sleep 10

    docker pull ${var.docker_image}
    docker run -d -p 80:5000 --restart unless-stopped ${var.docker_image}
  EOF

  tags = { Name = "url-shortener" }
}
