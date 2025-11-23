@echo off
title Detener Gestor de Proyectos
cls

echo ============================================================
echo      DETENIENDO GESTOR DE PROYECTOS
echo ============================================================
echo.

echo [1/3] Matando procesos de Java (Backend)...
taskkill /F /IM java.exe /T >nul 2>&1
if %ERRORLEVEL% EQU 0 (
    echo       [OK] Backend detenido.
) else (
    echo       [INFO] No se encontro proceso Java activo.
)

echo [2/3] Matando procesos de Node.js (Frontend)...
taskkill /F /IM node.exe /T >nul 2>&1
if %ERRORLEVEL% EQU 0 (
    echo       [OK] Frontend detenido.
) else (
    echo       [INFO] No se encontro proceso Node activo.
)

echo [3/3] Liberando puertos especificos (8088, 3000) por si acaso...
for /f "tokens=5" %%a in ('netstat -aon ^| find ":8088" ^| find "LISTENING"') do taskkill /f /pid %%a >nul 2>&1
for /f "tokens=5" %%a in ('netstat -aon ^| find ":3000" ^| find "LISTENING"') do taskkill /f /pid %%a >nul 2>&1

echo.
echo ============================================================
echo      TODO DETENIDO CORRECTAMENTE
echo ============================================================
echo.
pause