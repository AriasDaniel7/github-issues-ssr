const fs = require("fs");
const path = require("path");
require("dotenv").config();

const environments = {
  gitHubToken: process.env.GITHUB_TOKEN,
  baseUrl: process.env.BASE_URL,
};

const environmentContent = `
export const environment = ${JSON.stringify(environments, null, 2)};`;

const envPathEnvironmentProduction = path.join(
  __dirname,
  "src/environments/environment.ts"
);
const envPathEnvironmentDevelopment = path.join(
  __dirname,
  "src/environments/environment.development.ts"
);

const environmentsDir = path.join(__dirname, "src/environments");

if (!fs.existsSync(environmentsDir)) {
  fs.mkdirSync(environmentsDir, { recursive: true });
}

fs.writeFileSync(envPathEnvironmentProduction, environmentContent);
fs.writeFileSync(envPathEnvironmentDevelopment, environmentContent);

console.log("✅ Environment file generated successfully!");
console.log("📁 File:", envPathEnvironmentProduction);
console.log("📁 File:", envPathEnvironmentDevelopment);
