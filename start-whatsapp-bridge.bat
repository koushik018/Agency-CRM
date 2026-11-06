@echo off
title beRich Studio - WhatsApp Bridge
color 0A
cd /d "%~dp0"
echo ================================================================
echo   beRich Creative Studio - WhatsApp Bridge (runs on THIS computer)
echo ================================================================
echo.
echo Closing any older bridge that is still running...
for /f "tokens=5" %%a in ('netstat -ano ^| findstr ":3030" ^| findstr LISTENING') do taskkill /F /PID %%a >nul 2>&1
powershell -NoProfile -Command "Get-CimInstance Win32_Process | Where-Object { $_.CommandLine -like '*wwebjs_auth*' -and $_.ProcessId -ne $PID } | ForEach-Object { Stop-Process -Id $_.ProcessId -Force }" >nul 2>&1
timeout /t 1 /nobreak >nul
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
:run
node whatsapp-automation-service.js
echo.
echo The bridge stopped. Starting it again in 5 seconds (close this window to stop).
timeout /t 5 /nobreak >nul
goto run
