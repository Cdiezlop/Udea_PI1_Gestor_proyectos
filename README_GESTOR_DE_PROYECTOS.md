Gestor de Proyectos
====================

Proyecto Integrador I – Universidad de Antioquia
Aplicación web para la gestión de proyectos con Spring Boot y MongoDB en el backend y React en el frontend.

------------------------------------------------------------------
Estructura del repositorio
------------------------------------------------------------------

GESTOR_DE_PROYECTOS/
│── backend/                     # Proyecto Spring Boot (Java + Gradle + MongoDB)
│── frontend/                    # Proyecto React (Node.js + npm)
│── run_project.bat              # Script para ejecutar en Windows sin Docker
│── docker-compose.yml           # Orquestación con Docker
│── README.md                    # Guía de instalación y uso

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

Opción 2: Ejecución con Docker
------------------------------
Se requiere tener instalado:

- Docker Desktop (con soporte para WSL2 habilitado en Windows 10)
- Git (opcional, solo si se clona el repositorio)

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

------------------------------------------------------------------
Ejecución de pruebas
------------------------------------------------------------------

Backend
-------
cd backend/Gestor-De-Proyectos-develop
./gradlew test

Frontend
--------
cd frontend/frontend-gestorProyectos-develop
npm test

