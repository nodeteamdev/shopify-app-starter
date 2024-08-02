const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config();

const baseDir = path.resolve(__dirname, 'apps/client/dist');

const envVars = {
  SHOPIFY_API_KEY: process.env.SHOPIFY_API_KEY,
};

const envFileContent = `window.env = ${JSON.stringify(envVars)}`;

const envFilePath = path.join(baseDir, 'env.js');

fs.writeFileSync(envFilePath, envFileContent, { encoding: 'utf8' });

console.log('Environment variables injected successfully.');
