import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

const baseDir = path.resolve('apps/client/dist');

const envVars = {
  SHOPIFY_API_KEY: process.env.SHOPIFY_API_KEY,
};

const envFileContent = `window.env = ${JSON.stringify(envVars)}`;

const envFilePath = path.join(baseDir, 'env.js');

fs.writeFileSync(envFilePath, envFileContent, { encoding: 'utf8' });

console.log('Environment variables injected successfully.');
