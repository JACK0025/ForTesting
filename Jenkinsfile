pipeline {
    // Define the agent where the pipeline will run
    agent any

    // Define environment variables for Docker image and container names
    environment {
        IMAGE_NAME = 'test-image'
        CONTAINER_NAME = 'test-container'
        SAVED_IMAGE_FILE='test-image.tar'
        LOCAL_IMAGE_NAME='test-image:latest'
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
                    try {
                        sh 'npm test'
                        echo '✅ All tests passed!'
                    } catch (Exception e) {
                        echo '❌ Tests failed!'
                        currentBuild.result = 'FAILURE'
                        error('Stopping pipeline due to failed tests')
                    }
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
        stage('Save Docker Image to File') {
            steps {
                script {
                    echo "Saving Docker image to .tar file..."
                    sh "docker save -o ${SAVED_IMAGE_FILE} ${LOCAL_IMAGE_NAME}"
                }
            }
        }
    }
    post {
        always {
            script {
                echo "Cleaning up..."
                sh "docker rm ${CONTAINER_NAME} || true"
                // Optionally remove the Docker image
                sh "docker rmi ${IMAGE_NAME} || true"
            }
        }
        success {
            echo "Pipeline completed successfully!"
            archiveArtifacts artifacts: "${SAVED_IMAGE_FILE}", fingerprint: true
        }
        failure {
            echo "Pipeline failed. Please check the logs."
        }
    }
}