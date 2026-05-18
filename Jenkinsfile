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
          echo "=== Workspace contents ==="
          ls -la \${WORKSPACE}
          echo "=== Backend contents ==="
          ls -la \${WORKSPACE}/backend/ || echo "No backend folder found!"
        """
        script {
          docker.image('python:3.11-slim').inside {
            sh 'pip install -r backend/requirements.txt'
          }
        }
      }
    }

    stage('Security Scan') {
      steps {
        script {
          docker.image('python:3.11-slim').inside {
            sh 'pip install bandit && bandit -r backend/ -x backend/tests/ -f txt'
          }
          
          docker.image('node:20-alpine').inside {
            sh 'cd frontend && npm audit --audit-level=high || true'
          }
        }
        
        sh 'trivy image --exit-code 1 --severity HIGH,CRITICAL ${DOCKER_IMAGE}:latest || true'
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
          curl -LO "https://dl.k8s.io/release/v1.30.0/bin/linux/amd64/kubectl"
          chmod +x ./kubectl

          printf "%s" "$KUBECONFIG" > ./kube.conf
          chmod 600 ./kube.conf

          ./kubectl --kubeconfig=./kube.conf apply -f k8s/deployment.yaml
          ./kubectl --kubeconfig=./kube.conf apply -f k8s/service.yaml
          ./kubectl --kubeconfig=./kube.conf apply -f k8s/hpa.yaml
          ./kubectl --kubeconfig=./kube.conf set image deployment/url-shortener url-shortener=\${DOCKER_IMAGE}:\${BUILD_NUMBER}
          ./kubectl --kubeconfig=./kube.conf rollout status deployment/url-shortener
          
          rm ./kube.conf
        """
      }
    }
  }

  post {
    success { echo '✅ Deployment successful!' }
    failure  { echo '❌ Pipeline failed. Check logs above.' }
  }
}