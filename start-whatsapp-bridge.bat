@echo off
title beRich Studio - WhatsApp Bridge
color 0A
cd /d "%~dp0"
echo ================================================================
echo   beRich Creative Studio - WhatsApp Bridge (runs on THIS computer)
echo ================================================================
echo.
if not exist node_modules\whatsapp-web.js (
  echo First run: installing what is needed. This can take a few minutes.
  call npm install
  echo.
)
echo Starting the bridge. A page opens to link WhatsApp with your phone.
echo Keep this window open while you chat from the CRM.
echo.
timeout /t 2 /nobreak >nul
start http://localhost:3030/link
node whatsapp-automation-service.js
pause
