pipeline {
	agent any

	stages {
		stage("Clear") {
			steps {
				sh """
					rm -rf /www/notes
					mkdir /www/notes
				"""
			}
		}

		stage('Move') {
			steps {
				sh """
					tar -zcvf tmp.tar.gz *
					cp tmp.tar.gz /www/notes
					cd /www/notes
					tar -xzvf tmp.tar.gz
					rm -rf tmp.tar.gz
				"""
			}
		}
	}

	post {
		success {
			echo 'depoly success.'
		}

		failure {
			echo 'depoly failure.'
		}
	}
}