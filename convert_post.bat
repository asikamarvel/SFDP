@echo off
setlocal enabledelayedexpansion

REM ============================================
REM SFDP Blog Post Converter - Auto Mode
REM ============================================

echo ============================================
echo    SFDP Blog Post Converter
echo ============================================
echo.

REM Check if a file was dragged onto the script
if "%~1"=="" (
    echo ERROR: No file provided!
    echo.
    echo Please drag and drop a .docx file onto this script
    echo Or run: convert_post.bat "your-file.docx"
    echo.
    pause
    exit /b 1
)

REM Get the file path
set "DOCX_FILE=%~1"

REM Check if file exists
if not exist "%DOCX_FILE%" (
    echo ERROR: File not found: %DOCX_FILE%
    echo.
    pause
    exit /b 1
)

echo File: %DOCX_FILE%
echo.

REM Get the directory where this script is located
set "SCRIPT_DIR=%~dp0"

echo Analyzing document...
echo.

REM Analyze the document to get suggested title and category
for /f "tokens=1,* delims=:" %%a in ('python "%SCRIPT_DIR%convert_docx_to_post.py" "%DOCX_FILE%" --analyze 2^>nul') do (
    if "%%a"=="TITLE" set "AUTO_TITLE=%%b"
    if "%%a"=="CATEGORY" set "AUTO_CATEGORY=%%b"
)

REM Check if analysis worked
if not defined AUTO_TITLE (
    echo Could not auto-detect title. Please enter manually.
    set /p "FINAL_TITLE=Enter article title: "
) else (
    echo ============================================
    echo    DETECTED INFORMATION
    echo ============================================
    echo.
    echo Title:    %AUTO_TITLE%
    echo Category: %AUTO_CATEGORY%
    echo.
    echo ============================================
    echo.
    
    REM Ask for title confirmation
    set /p "TITLE_CONFIRM=Press ENTER to accept title, or type a new one: "
    
    if "!TITLE_CONFIRM!"=="" (
        set "FINAL_TITLE=!AUTO_TITLE!"
    ) else (
        set "FINAL_TITLE=!TITLE_CONFIRM!"
    )
)

REM Ask for category confirmation
if defined AUTO_CATEGORY (
    echo.
    echo Categories: Health, Disease, Vaccine, Prevention, Mental Health, Virus, Innovation, News, Charity
    set /p "CAT_CONFIRM=Press ENTER to accept [%AUTO_CATEGORY%], or type a new one: "
    
    if "!CAT_CONFIRM!"=="" (
        set "FINAL_CATEGORY=!AUTO_CATEGORY!"
    ) else (
        set "FINAL_CATEGORY=!CAT_CONFIRM!"
    )
) else (
    echo.
    echo Categories: Health, Disease, Vaccine, Prevention, Mental Health, Virus, Innovation, News, Charity
    set /p "FINAL_CATEGORY=Enter category (default: Health): "
    if "!FINAL_CATEGORY!"=="" set "FINAL_CATEGORY=Health"
)

echo.
echo ============================================
echo Converting with:
echo   Title:    %FINAL_TITLE%
echo   Category: %FINAL_CATEGORY%
echo ============================================
echo.

REM Run the Python script with confirmed values
python "%SCRIPT_DIR%convert_docx_to_post.py" "%DOCX_FILE%" --title "%FINAL_TITLE%" --category "%FINAL_CATEGORY%"

if errorlevel 1 (
    echo.
    echo ============================================
    echo ERROR: Conversion failed!
    echo ============================================
    echo.
    echo Make sure you have installed the required packages:
    echo   pip install python-docx Pillow
    echo.
) else (
    echo.
    echo ============================================
    echo SUCCESS! Your blog post is ready.
    echo ============================================
    echo.
)

echo.
echo Press any key to close this window...
pause >nul
