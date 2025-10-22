# Gestor de Proyectos
====================

Proyecto Integrador I – Universidad de Antioquia  
Aplicación web para la gestión de proyectos con Spring Boot y MongoDB en el backend y React en el frontend.

------------------------------------------------------------------
Estructura del repositorio
------------------------------------------------------------------

GESTOR_DE_PROYECTOS/
│── backend/                     # Proyecto Spring Boot (Java + Gradle + MongoDB)  
│── frontend/                    # Proyecto React (Node.js + npm)  
│── docker-compose.yml            # Orquestación con Docker  
│── run_project.bat               # Script para ejecutar en Windows sin Docker  
│── README.md                     # Guía de instalación y uso  

------------------------------------------------------------------
Requisitos
------------------------------------------------------------------

Opción 1: Ejecución manual en Windows (sin Docker)
--------------------------------------------------
Se requiere tener instalado:

- Java JDK 17  
- Gradle 7.x (ya está incluido en el proyecto con gradlew)  
- Node.js 18.x LTS  
- npm 9.x (incluido con Node.js)  
- MongoDB Community 6.x  

Opción 2: Ejecución manual en Linux (sin Docker)
------------------------------------------------
Se requiere tener instalado:

- Java JDK 17  
- Gradle 7.x  
- Node.js 18.x LTS  
- npm 9.x  
- MongoDB Community 6.x  



Instalación recomendada en Ubuntu/Lubuntu:


sudo apt update
sudo apt install openjdk-17-jdk nodejs npm mongodb -y


Verificar versiones:

java -version
node -v
npm -v
mongod --version



Opción 3: Ejecución con Docker (Windows o Linux)
------------------------------
El backend del proyecto requiere Java 17 para compilar correctamente con Gradle.
Si tienes instalada una versión superior (por ejemplo Java 21), debes instalar también
Java 17 y configurar el sistema para usarla temporalmente durante la compilación.

1. Instalar Java 17:

   sudo apt update
   sudo apt install openjdk-17-jdk -y

2. Verificar instalación:

   java -version
   javac -version

   Debe mostrar una versión similar a:
   openjdk version "17.0.xx"

3. Seleccionar Java 17 como versión activa del sistema:

   sudo update-alternatives --config java

   (Seleccionar la opción correspondiente a Java 17)

4. Confirmar el cambio:

   java -version

   Si muestra Java 17, continuar con la compilación.

5. Ejecutar la compilación del backend:

   cd ~/Desktop/GESTOR_DE_PROYECTOS/backend/Gestor-De-Proyectos-develop
   chmod +x gradlew
   ./gradlew clean build -x test

   Si la compilación finaliza con "BUILD SUCCESSFUL", el backend está listo.

6. (Opcional) Si deseas volver a usar Java 21:

   sudo update-alternatives --config java
   (Seleccionar la versión 21 nuevamente)

------------------------------------------------------------------
Ejecución del proyecto
------------------------------------------------------------------

Opción 1 – Script en Windows (sin Docker)
-----------------------------------------
1. Instalar y configurar MongoDB como servicio en Windows.
2. Editar el archivo run_project.bat y modificar la variable PROJECT_DIR para que apunte a la ruta completa de la carpeta GESTOR_DE_PROYECTOS.
3. Ejecutar el archivo run_project.bat haciendo doble clic o desde PowerShell/CMD:
   run_project.bat
4. El script realizará automáticamente:
   - Inicio del servicio de MongoDB.
   - Inserción de datos iniciales en la base de datos (usuario administrador, categorías y estados).
   - Ejecución del backend en http://localhost:8088
   - Ejecución del frontend en http://localhost:3000

Opción 2 – Ejecución con Docker
-------------------------------
1. Abrir una terminal en la carpeta raíz del proyecto (GESTOR_DE_PROYECTOS).
2. Ejecutar el siguiente comando:
   docker compose up --build
3. Esperar a que se levanten los contenedores.
4. Acceder a las aplicaciones:
   - Frontend (React): http://localhost:3000
   - Backend (API Spring Boot): http://localhost:8088/gestor
   - MongoDB: mongodb://localhost:27017


Opción 3 – Ejecución con Docker
-------------------------------

1. Abrir una terminal en la carpeta raíz del proyecto (GESTOR_DE_PROYECTOS).
2. Ejecutar:
   chmod +x backend/Gestor-De-Proyectos-develop/gradlew
   docker compose up --build

3. Esperar a que se levanten los contenedores.
4. Acceder a las aplicaciones:

   - Frontend (React): http://localhost:3000
   - Backend (API Spring Boot): http://localhost:8088/gestor
   - MongoDB: mongodb://localhost:27017

------------------------------------------------------------------
Notas importantes
------------------------------------------------------------------

- Usuario administrador inicial:
  user: admin
  password: admin123
  rol: admin

- Base de datos utilizada: gestor_db
- El backend expone la API bajo el prefijo /gestor
- El frontend está configurado para consumir la API en http://localhost:8088/gestor


Si se presenta un error de permisos al ejecutar Gradle en Linux, ejecutar:

chmod +x backend/Gestor-De-Proyectos-develop/gradlew


Si deseas reiniciar la base de datos y recargar los estados iniciales, usa:

```bash
docker compose down -v
docker compose up --build
```

------------------------------------------------------------------
Diagrama de arquitectura (simplificado)
------------------------------------------------------------------

            +-------------------+
            |   Frontend (React)|
            |   http://localhost:3000
            +---------+---------+
                      |
                      v
            +-------------------------+
            | Backend (Spring Boot)   |
            | http://localhost:8088   |
            | API REST /gestor        |
            +-----------+-------------+
                        |
                        v
            +-------------------------+
            | MongoDB (Base de datos) |
            | localhost:27017         |
            +-------------------------+



------------------------------------------------------------------
Tecnologías utilizadas
------------------------------------------------------------------

- Backend: Java 17, Spring Boot 3.x, Gradle 7.x, MongoDB
- Frontend: React 18, Node.js 18 LTS, npm 9.x
- Infraestructura: Docker y Docker Compose
- Entorno compatible: Windows 10/11, Ubuntu, Lubuntu, Debian

------------------------------------------------------------------
Ejecución de pruebas
------------------------------------------------------------------

Backend
-------
```bash
cd backend/Gestor-De-Proyectos-develop
./gradlew test
```

Frontend
--------

cd frontend/frontend-gestorProyectos-develop
npm test

------------------------------------------------------------------
Guía rápida (Linux)
------------------------------------------------------------------

```bash
sudo apt update && sudo apt install docker.io docker-compose -y
git clone https://github.com/Cdiezlop/Udea_PI1_Gestor_proyectos.git "GESTOR_DE_PROYECTOS"
cd "GESTOR_DE_PROYECTOS"
chmod +x backend/Gestor-De-Proyectos-develop/gradlew
docker compose up --build
```

------------------------------------------------------------------
Autores
------------------------------------------------------------------

- Cristian Diez
- Jhoan Villa

Proyecto Integrador I – Universidad de Antioquia
2025
