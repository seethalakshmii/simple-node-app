# CI/CD Pipeline Project using GitHub, Jenkins, Docker, and Kubernetes

## Project Overview
This project implements an automated CI/CD pipeline using GitHub, Jenkins, Docker, and Kubernetes. The pipeline automates the process of code integration, testing, containerization, security scanning, and deployment of a Node.js application across multiple environments.

## Objectives
- Automate continuous integration and continuous deployment workflow
- Enable automatic builds on every GitHub commit
- Perform automated unit testing and security scanning
- Deploy application to Kubernetes clusters (Dev, Staging, Production)
- Ensure scalable and maintainable pipeline architecture

## Technology Stack
- GitHub: Source code management
- Jenkins: CI/CD orchestration
- Node.js: Application runtime
- Docker: Containerization
- Kubernetes (Minikube): Container orchestration
- Trivy: Container security scanning
- ngrok: Webhook tunneling for GitHub integration

## CI/CD Pipeline Workflow
1. Developer pushes code to GitHub repository
2. GitHub webhook triggers Jenkins pipeline via ngrok URL
3. Jenkins pulls the latest source code
4. Dependencies are installed using npm install
5. Unit tests are executed using npm test
6. Docker image is built using Dockerfile
7. Docker image is pushed to Docker Hub
8. Security scanning is performed using Trivy
9. Application is deployed to Kubernetes environments:
   - Development namespace
   - Staging namespace
   - Production namespace

## Setup Instructions

### Prerequisites
- Jenkins installed and configured
- Docker installed and running
- Kubernetes cluster (Minikube or any K8s cluster)
- Node.js installed
- ngrok installed for webhook exposure

### Jenkins Configuration
- Install required plugins:
  - Git Plugin
  - Pipeline Plugin
  - Docker Pipeline Plugin
  - Credentials Binding Plugin
- Configure DockerHub credentials in Jenkins (credentialsId: dockerhub-creds)

### GitHub Webhook Configuration
- Start ngrok tunnel:
  ngrok http 8080
- Copy generated HTTPS URL
- Configure GitHub webhook:
  <ngrok-url>/github-webhook/
- Set content type to application/json
- Trigger on push events

### Kubernetes Setup

Create namespaces:

```bash
kubectl create namespace dev
kubectl create namespace staging
kubectl create namespace prod
```

## Testing
Unit testing is implemented using Jest.

Command:
npm test

## Security Scanning
Container images are scanned using Trivy to identify vulnerabilities.

Command:
docker run --rm aquasec/trivy image <image-name>

## Deployment Validation

```bash
- kubectl get pods -n dev
- kubectl get svc -n dev
- kubectl rollout status deployment/simple-node-app
```

## Accessing the Live Application
To access the running application in Kubernetes (Minikube), use:
```bash
minikube service simple-node-app -n dev
```

## Rollback Strategy
In case of deployment failure, the previous stable version can be restored using:
kubectl rollout undo deployment/simple-node-app -n prod

## Monitoring and Logging (Recommendation)
- Prometheus can be used for collecting cluster metrics such as CPU, memory, and pod health.
- Grafana can be used for visualization of cluster performance dashboards.
- Elasticsearch can be used for centralized logging and log analysis.

## Outcome
This project demonstrates a fully automated and scalable CI/CD pipeline with integrated testing, security scanning, and Kubernetes-based deployment, ensuring reliable and consistent software delivery.


# Project Report

📄 Click below to view the complete project documentation.

[View Full Project Report](project-assets/report/SEETHA_PROJECT_REPORT_18_MAY.pdf)


# Project Demo Video

▶ Click below to watch the complete project demonstration.

[▶ Watch Demo Video on Google Drive](https://drive.google.com/file/d/1HHSab7Bj8-XspkBzwdGTeuukR2gGSOul/view?usp=sharing)

[▶ View / Download Video from GitHub](project-assets/video/project-demo.mp4)


