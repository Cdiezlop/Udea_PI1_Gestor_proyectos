@echo off
title Launcher Gestor de Proyectos
cls

echo ============================================================
echo      INICIANDO GESTOR DE PROYECTOS (FULL STACK)
echo ============================================================
echo.

REM --- 1. VERIFICACIÓN DE RUTAS ---
echo [1/5] Verificando directorio...
if not exist "backend" (
    echo ERROR: No se encuentra la carpeta 'backend'.
    echo Asegurate de ejecutar este archivo desde la raiz del proyecto.
    pause
    exit
)
if not exist "frontend" (
    echo ERROR: No se encuentra la carpeta 'frontend'.
    pause
    exit
)

REM --- 2. BASE DE DATOS (Reset y Carga) ---
echo [2/5] Preparando Base de Datos (MongoDB)...

REM Intentar iniciar el servicio por si acaso (requiere permisos de admin a veces, si falla no importa si ya está corriendo)
net start MongoDB >nul 2>&1

echo       - Limpiando base de datos antigua...
call mongosh "mongodb://localhost:27017/gestor_db" --quiet --eval "db.proyectos.deleteMany({}); db.compromiso.deleteMany({}); db.categoria.deleteMany({}); db.estado.deleteMany({}); db.usuario.deleteMany({});"

echo       - Cargando Categorias...
call mongosh "mongodb://localhost:27017/gestor_db" --quiet --file "backend\Gestor-De-Proyectos-develop\scripts\categorias.js"

echo       - Cargando Estados...
call mongosh "mongodb://localhost:27017/gestor_db" --quiet --file "backend\Gestor-De-Proyectos-develop\scripts\estados.js"

echo       - Cargando Usuario Admin...
call mongosh "mongodb://localhost:27017/gestor_db" --quiet --file "backend\Gestor-De-Proyectos-develop\scripts\usuarioAdmin.js"

echo       - Cargando Datos de Prueba (Usuarios y Proyectos)...
call mongosh "mongodb://localhost:27017/gestor_db" --quiet --file "backend\Gestor-De-Proyectos-develop\scripts\datos_prueba.js"

echo       [OK] Base de datos lista.

REM --- 3. INICIAR BACKEND ---
echo [3/5] Iniciando Backend (Spring Boot)...
echo       Se abrira en una nueva ventana. NO LA CIERRES.
cd "backend\Gestor-De-Proyectos-develop"
start "BACKEND - Gestor Proyectos" cmd /k ".\gradlew.bat bootRun"
cd ..\..

REM --- 4. INICIAR FRONTEND ---
echo [4/5] Iniciando Frontend (React)...
echo       Se abrira en una nueva ventana. NO LA CIERRES.
cd "frontend\frontend-gestorProyectos-develop"

REM Verificamos si node_modules existe, si no, instalamos
if not exist "node_modules" (
    echo       Primera vez detectada. Instalando dependencias (npm install)...
    call npm install
)

start "FRONTEND - Gestor Proyectos" cmd /k "npm start"
cd ..\..

REM --- 5. ABRIR NAVEGADOR ---
echo [5/5] Abriendo navegador...
timeout /t 10 >nul
start http://localhost:3000

echo.
echo ============================================================
echo      APLICACION INICIADA CORRECTAMENTE
echo ============================================================
echo.
echo  - Backend corriendo en puerto 8088
echo  - Frontend corriendo en puerto 3000
echo  - Datos de prueba cargados
echo.
echo  Puedes minimizar esta ventana, pero no cierres las otras dos.
echo.
pause