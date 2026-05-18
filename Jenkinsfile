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
        git branch: 'main', url: 'https://github.com/Pankaj-Bashera/url-shortener.git'
      }
    }

    stage('Test') {
      steps {
        sh 'pip install -r backend/requirements.txt'
        sh 'python -m pytest backend/tests/ -v'
      }
    }

    stage('Security Scan') {
      steps {
        sh 'pip install bandit && bandit -r backend/ -f txt'
        sh 'trivy image --exit-code 1 --severity HIGH,CRITICAL ${DOCKER_IMAGE}:latest || true'
      }
    }

    stage('Docker Build') {
      steps {
        sh 'docker build -t ${DOCKER_IMAGE}:${BUILD_NUMBER} .'
        sh 'docker tag ${DOCKER_IMAGE}:${BUILD_NUMBER} ${DOCKER_IMAGE}:latest'
      }
    }

    stage('Docker Push') {
      steps {
        sh 'echo ${DOCKER_CREDENTIALS_PSW} | docker login -u ${DOCKER_CREDENTIALS_USR} --password-stdin'
        sh 'docker push ${DOCKER_IMAGE}:${BUILD_NUMBER}'
        sh 'docker push ${DOCKER_IMAGE}:latest'
      }
    }

    stage('Deploy to Kubernetes') {
      steps {
        sh 'kubectl apply -f k8s/deployment.yaml'
        sh 'kubectl apply -f k8s/service.yaml'
        sh 'kubectl apply -f k8s/hpa.yaml'
        sh 'kubectl set image deployment/url-shortener url-shortener=${DOCKER_IMAGE}:${BUILD_NUMBER}'
        sh 'kubectl rollout status deployment/url-shortener'
      }
    }

  }

  post {
    success { echo '✅ Deployment successful!' }
    failure  { echo '❌ Pipeline failed. Check logs above.' }
  }
}
