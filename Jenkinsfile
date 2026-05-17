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
                    docker push %IMAGE_NAME%:%IMAGE_TAG%
                    """
                }
            }
        }

        stage('Deploy to Kubernetes') {
            steps {
                bat """
                set KUBECONFIG=C:\\ProgramData\\Jenkins\\.kube\\config

                kubectl config use-context minikube

                kubectl set image deployment/simple-node-app simple-node-app=%IMAGE_NAME%:%IMAGE_TAG%

                kubectl rollout status deployment/simple-node-app
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
