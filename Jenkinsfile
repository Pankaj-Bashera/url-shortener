pipeline {
  agent any

  environment {
    DOCKER_IMAGE       = 'panku0101/url-shortener'
    DOCKER_CREDENTIALS = credentials('dockerhub-creds')
    KUBECONFIG         = credentials('kubeconfig')
  }

  stages {
    stage('Checkout') {
      steps {
        checkout scm
      }
    }

    stage('Test') {
      steps {
        sh """
          docker run --rm -v \${WORKSPACE}:/app -w /app python:3.11-slim \
            sh -c 'pip install -r backend/requirements.txt && python -m pytest backend/tests/ -v'
          docker run --rm -v \${WORKSPACE}:/app -w /app/frontend node:20-alpine \
            sh -c 'npm install && npm run build'
        """
      }
    }

    stage('Security Scan') {
      steps {
        sh """
          docker run --rm -v \${WORKSPACE}:/app -w /app python:3.11-slim \
            sh -c 'pip install bandit && bandit -r backend/ -f txt'
          docker run --rm -v \${WORKSPACE}:/app -w /app/frontend node:20-alpine \
            sh -c 'npm audit --audit-level=high || true'
          trivy image --exit-code 1 --severity HIGH,CRITICAL \${DOCKER_IMAGE}:latest || true
        """
      }
    }

    stage('Docker Build') {
      steps {
        sh """
          docker build -t \${DOCKER_IMAGE}:\${BUILD_NUMBER} .
          docker tag \${DOCKER_IMAGE}:\${BUILD_NUMBER} \${DOCKER_IMAGE}:latest
        """
      }
    }

    stage('Docker Push') {
      steps {
        sh """
          echo \${DOCKER_CREDENTIALS_PSW} | docker login -u \${DOCKER_CREDENTIALS_USR} --password-stdin
          docker push \${DOCKER_IMAGE}:\${BUILD_NUMBER}
          docker push \${DOCKER_IMAGE}:latest
        """
      }
    }

    stage('Deploy to Kubernetes') {
      steps {
        sh """
          kubectl apply -f k8s/deployment.yaml
          kubectl apply -f k8s/service.yaml
          kubectl apply -f k8s/hpa.yaml
          kubectl set image deployment/url-shortener url-shortener=\${DOCKER_IMAGE}:\${BUILD_NUMBER}
          kubectl rollout status deployment/url-shortener
        """
      }
    }
  }

  post {
    success { echo '✅ Deployment successful!' }
    failure  { echo '❌ Pipeline failed. Check logs above.' }
  }
}