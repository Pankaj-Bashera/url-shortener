variable "aws_region" {
  description = "AWS region to deploy resources"
  type        = string
  default     = "us-east-1"
}

variable "key_pair_name" {
  description = "Name of the EC2 key pair for SSH access"
  type        = string
}

variable "docker_image" {
  description = "Docker image to run on the EC2 instance"
  type        = string
  default     = "your-dockerhub-user/url-shortener:latest"
}
