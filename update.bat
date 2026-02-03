@echo off
echo ===================================
echo  Virgin Counter - Auto GitHub Updater
echo ===================================
echo.

:: Go to the project directory
cd /d "%~dp0"

echo [1/3] Staging all changes...
git add .
echo.

echo [2/3] Committing changes...
git commit -m "Automatic update from local machine"
echo.

echo [3/3] Pushing changes to GitHub...
git push origin main
echo.

echo ===================================
echo  Update complete!
echo  Your files have been pushed to GitHub.
echo ===================================
echo.
pause
