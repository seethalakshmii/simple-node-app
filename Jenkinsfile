pipeline {

    agent any

    environment {
        IMAGE_NAME = "seetha88/simple-node-app"
        IMAGE_TAG = "${BUILD_NUMBER}"
    }

    stages {

        stage('Clone Repository') {
            steps {
                git branch: 'main',
                url: 'https://github.com/seethalakshmii/simple-node-app.git'
            }
        }

        stage('Dependency Check') {
            steps {
                bat 'npm audit || exit 0'
            }
        }

        stage('Build Docker Image') {
            steps {
                bat """
                docker build -t %IMAGE_NAME%:%IMAGE_TAG% .
                """
            }
        }

        stage('Push Docker Image') {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: 'dockerhub-creds',
                    usernameVariable: 'DOCKER_USER',
                    passwordVariable: 'DOCKER_PASS'
                )]) {

                    bat """
                    echo %DOCKER_PASS% | docker login -u %DOCKER_USER% --password-stdin
                    docker tag %IMAGE_NAME%:%IMAGE_TAG% %IMAGE_NAME%:latest
                    docker push %IMAGE_NAME%:%IMAGE_TAG%
                    docker push %IMAGE_NAME%:latest
                    """
                }
            }
        }

        stage('Deploy to Kubernetes') {
            steps {
                bat """
                set KUBECONFIG=C:\\ProgramData\\Jenkins\\.kube\\config
                
                kubectl config current-context
                kubectl config use-context minikube
                
                kubectl apply -f k8s/deployment.yaml --validate=false
                kubectl apply -f k8s/service.yaml --validate=false
                """
            }
        }
    }

    post {
        success {
            echo 'Deployment Successful'
        }
        failure {
            echo 'Pipeline Failed'
        }
        always {
            cleanWs()
        }
    }
}
