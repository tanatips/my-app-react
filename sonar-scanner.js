const scanner = require('sonarqube-scanner');

scanner.scan(
  {
    serverUrl: 'http://localhost:9000',
    token: process.env.SONAR_TOKEN,
    options: {
      'sonar.sources': 'src',
      'sonar.tests': 'src',
      'sonar.test.inclusions': 'src/**/*.test.tsx,src/**/*.test.ts,src/**/*.spec.tsx,src/**/*.spec.ts',
      'sonar.typescript.lcov.reportPaths': 'coverage/lcov.info',
      'sonar.javascript.lcov.reportPaths': 'coverage/lcov.info',
      'sonar.projectKey': 'AD-Web',
      'sonar.projectName': 'AD-Web'
    }
  },
  () => process.exit()
);
