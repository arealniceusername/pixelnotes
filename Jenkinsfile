pipeline {
  agent any

  stages {
    stage('Stage 1') {
      steps {
        echo 'Hello from Stage 1!'
      }
    }

    stage('Stage 2') {
      steps {
        echo 'Now running Stage 2!'
      }
    }

    stage('Stage 3') {
      steps {
        echo 'This is the final stage.'
      }
    }
  }

  post {
    always {
      echo 'Pipeline finished running.'
    }
  }
}
