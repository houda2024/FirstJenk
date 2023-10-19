pipeline{
    agent any
    triggers{
        pollSCM('*/5****')
        
    }
    stages{
        stage('checkout'){
            steps{
            echo"recup du code source"
            checkout scm
        }
    }
    stage('Build'){
        steps{
            echo "build of project"
        }
        
    }
    stage('Deploy'){
        steps{
            echo "Deploy pf project"
        }
    }
}