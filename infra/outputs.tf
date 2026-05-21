output "instance_public_ip" {
  description = "Public IP of the EC2 instance"
  value       = aws_instance.url_shortener_vm.public_ip
}

output "app_url" {
  description = "URL to access the URL shortener app"
  value       = "http://${aws_instance.url_shortener_vm.public_ip}"
}
output "prometheus" {
  description = "URL to access the URL shortener app"
  value       = "http://${aws_instance.url_shortener_vm.public_ip}:9090"
}
output "grafana" {
  description = "URL to access the URL shortener app"
  value       = "http://${aws_instance.url_shortener_vm.public_ip}:3000"
}
