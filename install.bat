@echo off
echo ====================================
echo Instalador - Sistema Editora Peru
echo ====================================
echo.

REM Verificar si Python está instalado
python --version >nul 2>&1
if errorlevel 1 (
    echo ERROR: Python no está instalado o no está en el PATH
    echo Por favor instala Python desde https://www.python.org/
    pause
    exit /b 1
)

echo [1/4] Python detectado correctamente
echo.

REM Crear entorno virtual
echo [2/4] Creando entorno virtual...
python -m venv venv
if errorlevel 1 (
    echo ERROR: No se pudo crear el entorno virtual
    pause
    exit /b 1
)

echo [3/4] Activando entorno virtual...
call venv\Scripts\activate.bat

echo [4/4] Instalando dependencias...
pip install -r requirements.txt
if errorlevel 1 (
    echo ERROR: No se pudieron instalar las dependencias
    pause
    exit /b 1
)

echo.
echo ====================================
echo Instalacion completada exitosamente!
echo ====================================
echo.
echo IMPORTANTE: Debes copiar las imagenes desde:
echo   C:\Users\luigy\OneDrive\Escritorio\EDITORA\IMG
echo.
echo A la carpeta:
echo   %CD%\static\img\
echo.
echo Imagenes necesarias:
echo   - fondo.jpg (imagen del edificio)
echo   - logolargo.jpg (logo con texto)
echo   - logo.jpg (logo simple)
echo.
echo Para ejecutar la aplicacion, usa: run.bat
echo.
pause
