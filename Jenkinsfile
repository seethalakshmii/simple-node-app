pipeline {

    agent any

    options {
        timestamps()
    }

    parameters {
        string(name: 'GIT_REPO', defaultValue: 'https://github.com/seethalakshmii/simple-node-app.git', description: 'Git repository URL')
        string(name: 'IMAGE_NAME', defaultValue: 'seetha88/simple-node-app', description: 'Docker image name')
    }

    environment {
        IMAGE_TAG = "${BUILD_NUMBER}"
        KUBECONFIG = "C:\\ProgramData\\Jenkins\\.kube\\config"
    }

    stages {

        stage('Checkout Code') {
            steps {
                git branch: 'main', url: "${params.GIT_REPO}"
            }
        }

        stage('Install Dependencies') {
            steps {
                bat 'npm install'
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

        stage('Deploy to Dev') {
            steps {
                bat """
                kubectl set image deployment/simple-node-app simple-node-app=%IMAGE_NAME%:%IMAGE_TAG% -n dev

                kubectl annotate deployment simple-node-app -n dev ^
                kubernetes.io/change-cause="Deployed image %IMAGE_NAME%:%IMAGE_TAG%" --overwrite

                kubectl rollout status deployment/simple-node-app -n dev
                """
            }
        }

        stage('Deploy to Staging') {
            steps {
                bat """
                kubectl set image deployment/simple-node-app simple-node-app=%IMAGE_NAME%:%IMAGE_TAG% -n staging

                kubectl annotate deployment simple-node-app -n staging ^
                kubernetes.io/change-cause="Deployed image %IMAGE_NAME%:%IMAGE_TAG%" --overwrite

                kubectl rollout status deployment/simple-node-app -n staging
                """
            }
        }

        stage('Deploy to Prod') {
            steps {
                bat """
                kubectl set image deployment/simple-node-app simple-node-app=%IMAGE_NAME%:%IMAGE_TAG% -n prod

                kubectl annotate deployment simple-node-app -n prod ^
                kubernetes.io/change-cause="Deployed image %IMAGE_NAME%:%IMAGE_TAG%" --overwrite

                kubectl rollout status deployment/simple-node-app -n prod
                """
            }
        }

        stage('Logs (Verification)') {
            steps {
                bat """
                kubectl get pods -n dev
                kubectl get svc -n dev
                kubectl logs -l app=simple-node-app -n dev --tail=20
                """
            }
        }

        stage('Rollback (Manual Trigger Only)') {
            when {
                expression { return false }
            }
            steps {
                bat """
                kubectl rollout undo deployment/simple-node-app -n dev
                kubectl rollout status deployment/simple-node-app -n dev
                """
            }
        }
    }

    post {

        success {
            echo 'CI/CD Pipeline executed successfully'
        }

        failure {
            echo 'Pipeline failed - check logs'
        }

        always {
            cleanWs()
        }
    }
}
