module.exports = {
  apps: [{
    name: 'BN',
    script: 'dist/src/main.js',
    instances: '1',
    exec_mode: 'cluster',
  }],
};
