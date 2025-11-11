@echo off
echo ====================================
echo Sistema de Pagos - Editora Peru
echo ====================================
echo.
echo Iniciando servidor...
echo.
echo La aplicacion estara disponible en:
echo   http://localhost:5000
echo.
echo Presiona Ctrl+C para detener el servidor
echo.

call venv\Scripts\activate.bat
python app.py
