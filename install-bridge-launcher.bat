@echo off
title beRich - allow the CRM to start the bridge
cd /d "%~dp0"
echo This lets the CRM's Start bridge button start the WhatsApp bridge on THIS computer.
echo It adds one entry for your Windows user only (no admin needed).
echo.
reg add "HKCUSoftwareClasseserichbridge" /ve /d "URL:beRich Bridge" /f >nul
reg add "HKCUSoftwareClasseserichbridge" /v "URL Protocol" /d "" /f >nul
reg add "HKCUSoftwareClasseserichbridgeshellopencommand" /ve /d "cmd /c start \"beRich Bridge\" /min \"%~dp0start-whatsapp-bridge.bat\" quiet" /f >nul
echo Done. In the CRM, press Start bridge. Chrome may ask once to open the link: tick Always allow.
echo To remove it later: reg delete HKCUSoftwareClasseserichbridge /f
pause
