@echo off
REM ==========================================================
REM =   SCRIPT DE ARRANQUE PARA GESTOR_DE_PROYECTOS (Windows) =
REM ==========================================================
REM Autor: CristianDiez
REM Fecha: 2025-09-25
REM Uso: hacer doble clic o ejecutar en PowerShell/CMD
REM ----------------------------------------------------------

REM --- Ajustar esta variable si cambiaste de ruta ---
SET PROJECT_DIR=C:\ruta\GESTOR_DE_PROYECTOS

REM ==========================================================
REM 1. Iniciar servicio MongoDB
REM ==========================================================
echo [1/4] Iniciando MongoDB...
net start MongoDB
if errorlevel 2 (
    echo El servicio de MongoDB ya estaba iniciado.
)

REM ==========================================================
REM 2. Insertar datos iniciales en la BD
REM ==========================================================
echo [2/4] Insertando datos iniciales en MongoDB...
REM Usamos mongosh para ejecutar los scripts .mongodb

mongosh "mongodb://localhost:27017" --file "%PROJECT_DIR%\backend\Gestor-De-Proyectos-develop\scripts\usuarioAdmin.mongodb"
mongosh "mongodb://localhost:27017" --file "%PROJECT_DIR%\backend\Gestor-De-Proyectos-develop\scripts\categorias.mongodb"
mongosh "mongodb://localhost:27017" --file "%PROJECT_DIR%\backend\Gestor-De-Proyectos-develop\scripts\estados.mongodb"

REM ==========================================================
REM 3. Ejecutar backend (Spring Boot con Gradle)
REM ==========================================================
echo [3/4] Levantando backend en puerto 8088...
cd /d "%PROJECT_DIR%\backend\Gestor-De-Proyectos-develop"
start cmd /k ".\gradlew.bat bootRun"

REM ==========================================================
REM 4. Ejecutar frontend (React con npm)
REM ==========================================================
echo [4/4] Levantando frontend en puerto 3000...
cd /d "%PROJECT_DIR%\frontend\frontend-gestorProyectos-develop"
REM Si es la primera vez, instala dependencias
if not exist "node_modules" (
    echo Instalando dependencias del frontend...
    npm install
)
start cmd /k "npm start"

echo ==========================================================
echo Todo esta corriendo. 
echo Frontend: http://localhost:3000
echo Backend : http://localhost:8088/gestor
echo ==========================================================
pause
