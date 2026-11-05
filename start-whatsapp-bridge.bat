@echo off
title beRich Studio - 24/7 WhatsApp Automation Bridge
color 0A
cd /d "%~dp0"
echo ================================================================
echo   beRich Creative Studio - Phase 2 WhatsApp Automation Engine
echo ================================================================
echo.
echo Running from: %~dp0
echo Starting 24/7 local headless bridge daemon...
echo Telemetry Dashboard: http://localhost:3030
echo.
timeout /t 2 /nobreak >nul
start http://localhost:3030
node whatsapp-automation-service.js
pause
