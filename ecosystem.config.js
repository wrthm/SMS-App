module.exports = {
  apps : [{
    name: 'sms-app-server',
    script: 'dist/index.js',
    instances: 2,
    env: {
      NODE_ENV: 'production'
    },
    env_development: {
      NODE_ENV: 'development'
    }
  }, {
    name: 'sms-docs-server',
    script: 'src/hostAPIDocs.js',
    env: {
      NODE_ENV: 'production'
    },
    env_development: {
      NODE_ENV: 'development'
    }
  }],
};
