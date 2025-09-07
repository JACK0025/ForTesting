pipeline {
    // Define the agent where the pipeline will run
    agent any

    // Define environment variables for Docker image and container names
    environment {
        IMAGE_NAME = 'test-image'
        CONTAINER_NAME = 'test-container'
    }
    // Initial checkout stage to pull the latest code from SCM
    stages('Checkout') {
        stage('Checkout') {
        steps {
            git branch: 'main', url: 'https://github.com/JACK0025/ForTesting.git'
        }
    }
        stage('Install Dependencies') {
            steps {
                script {
                    echo "Installing dependencies..."
                    // Example command to install dependencies, replace with actual commands
                    sh "npm install"
                }
            }
        }
        stage('Run Tests') {
            steps {
                script {
                    echo "Running tests..."
                    // Example command to run tests, replace with actual test commands
                    sh "npm test"
                }
            }
        }
        stage('Build Docker Image') {
            steps {
                script {
                    echo "Building Docker image..."
                    sh "docker build -t ${IMAGE_NAME} ."
                }
            }
        }
        stage('Run Docker Container') {
            steps {
                script {
                    echo "Running Docker container..."
                    sh "docker run -d --name ${CONTAINER_NAME} ${IMAGE_NAME}"
                }
            }
        }
        stage('Test Application') {
            steps {
                script {
                    echo "Testing application inside the container..."
                    // Example test command, replace with actual test commands
                    sh "docker exec ${CONTAINER_NAME} curl -f http://localhost:8080 || exit 1"
                }
            }
        }
    }
    post {
        always {
            script {
                echo "Cleaning up..."
                // Stop and remove the Docker container
                sh "docker stop ${CONTAINER_NAME} || true"
                sh "docker rm ${CONTAINER_NAME} || true"
                // Optionally remove the Docker image
                sh "docker rmi ${IMAGE_NAME} || true"
            }
        }
        success {
            echo "Pipeline completed successfully!"
        }
        failure {
            echo "Pipeline failed. Please check the logs."
        }
    }
}