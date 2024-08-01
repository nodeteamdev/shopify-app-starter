import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const envVars = {
  SHOPIFY_API_KEY: process.env.SHOPIFY_API_KEY,
};

const envFileContent = `window.env = ${JSON.stringify(envVars)}`;

const envFilePath = path.resolve(__dirname, 'apps/client/dist/env.js');

fs.writeFileSync(envFilePath, envFileContent, { encoding: 'utf8' });

console.log('Environment variables injected successfully.');
