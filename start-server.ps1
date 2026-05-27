# PowerShell helper to install dependencies and start the Refugee Identity & Entitlement Management System

$nodeVersion = & node -v 2>$null
if (-not $nodeVersion) {
    Write-Host "Node.js is not installed or not available in PATH."
    Write-Host "Install Node.js from https://nodejs.org and then rerun this script."
    exit 1
}

Write-Host "Node.js version: $nodeVersion"
Write-Host "Installing dependencies..."

npm install
if ($LASTEXITCODE -ne 0) {
    Write-Host "npm install failed. Fix the error and run this script again."
    exit $LASTEXITCODE
}

Write-Host "Starting the app on http://localhost:3000"
npm start
