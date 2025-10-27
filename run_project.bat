@echo off
REM ==========================================================
REM =   SCRIPT DE ARRANQUE LOCAL PARA GESTOR_DE_PROYECTOS (Windows) =
REM ==========================================================
REM Autor: CristianDiez & Jhoan Villa
REM Fecha: 2025-10-26
REM Uso: Asegúrate de tener mongosh, Java 17 y Node.js 18 en tu PATH.
REM      Ejecuta este script desde la carpeta raíz del proyecto.
REM ----------------------------------------------------------

REM Establece el directorio del proyecto basado en la ubicación del script
SET "PROJECT_DIR=%~dp0"
SET "BACKEND_DIR=%PROJECT_DIR%backend\Gestor-De-Proyectos-develop"
SET "FRONTEND_DIR=%PROJECT_DIR%frontend\frontend-gestorProyectos-develop"
SET "SCRIPTS_DIR=%BACKEND_DIR%\scripts"

REM ==========================================================
REM 1. Iniciar servicio MongoDB
REM ==========================================================
echo [1/4] Iniciando MongoDB...
net start MongoDB
if errorlevel 1 (
    echo El servicio de MongoDB ya estaba iniciado o no se pudo iniciar.
)

REM ==========================================================
REM 2. Insertar datos iniciales en la BD (usando mongosh y .js)
REM ==========================================================
echo [2/4] Insertando datos iniciales en MongoDB...

REM Vacía las colecciones existentes antes de insertar
mongosh "mongodb://localhost:27017/gestor_db" --eval "db.categoria.deleteMany({}); db.estado.deleteMany({}); db.usuario.deleteMany({});"

REM Inserta los datos
mongosh "mongodb://localhost:27017/gestor_db" --file "%SCRIPTS_DIR%\categorias.js"
mongosh "mongodb://localhost:27017/gestor_db" --file "%SCRIPTS_DIR%\estados.js"
mongosh "mongodb://localhost:27017/gestor_db" --file "%SCRIPTS_DIR%\usuarioAdmin.js"

echo Datos cargados.

REM ==========================================================
REM 3. Ejecutar backend (Spring Boot con Gradle)
REM ==========================================================
echo [3/4] Levantando backend en puerto 8088...
cd /d "%BACKEND_DIR%"
start "Backend" cmd /k ".\gradlew.bat bootRun"

REM ==========================================================
REM 4. Ejecutar frontend (React con npm)
REM ==========================================================
echo [4/4] Levantando frontend en puerto 3000...
cd /d "%FRONTEND_DIR%"

REM Si es la primera vez, instala dependencias
if not exist "node_modules" (
    echo Instalando dependencias del frontend (npm install)...
    call npm install
)

REM Instala bootstrap por si acaso
echo Verificando bootstrap...
call npm install bootstrap

start "Frontend" cmd /k "npm start"

echo ==========================================================
echo Todo esta corriendo.
echo Frontend: http://localhost:3000
echo Backend : http://localhost:8088/gestor
echo ==========================================================
pause