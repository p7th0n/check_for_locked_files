:: Check for locks
@echo off
echo.
echo Watch for open-locked files
echo.
set WEB_JSON_FILE=%WEBPATH%\checkforlockedfiles.json
set LOCAL_JSON_FILE=checkforlockedfiles.json

:RUN_CHECK

:: cscript checkforlocks.vbs

echo %DATE% %TIME% Generating JSON file ##############################
cscript //Nologo checkforlocks.vbs > %LOCAL_JSON_FILE%


echo %DATE% %TIME% Copying local file to web serer
copy %LOCAL_JSON_FILE% %WEB_JSON_FILE% /Y 
echo %DATE% %TIME% File copied
echo %DATE% %TIME% Sleep for 30 seconds
sleep 30
goto RUN_CHECK
