# Gestor de Proyectos
Proyecto Integrador I – Universidad de Antioquia  
Aplicación web para la gestión de proyectos con Spring Boot (Backend), React (Frontend) y MongoDB (Base de Datos).

---

## Tecnologías Utilizadas

* **Backend:** Java 17, Spring Boot 3.x, Gradle
* **Frontend:** React 18, Node.js 18 LTS
* **Base de Datos:** MongoDB 6.x
* **Contenedores:** Docker y Docker Compose

---

## Datos de Acceso

Una vez que la aplicación esté corriendo (local o Docker), puedes usar el usuario administrador inicial:

* **Usuario:** `admin`
* **Contraseña:** `admin123`
* **Base de Datos (local):** `mongodb://localhost:27017/gestor_db`

---

## Opción 1: Ejecución con Docker (Recomendado)

Este método es el más sencillo ya que no requiere instalar Java, Node o MongoDB manualmente en tu máquina.

### Requisitos Previos (Docker)
* [Docker Desktop](https://www.docker.com/products/docker-desktop/) para Windows, Mac o Linux.

### Pasos para Ejecutar con Docker

1.  **Clonar el Repositorio:**
    ```bash
    git clone [https://github.com/Cdiezlop/Udea_PI1_Gestor_proyectos.git](https://github.com/Cdiezlop/Udea_PI1_Gestor_proyectos.git) GESTOR_DE_PROYECTOS
    cd GESTOR_DE_PROYECTOS
    ```

2.  **Dar Permisos de Ejecución (Solo Linux/Mac):**
    Si estás en Linux o macOS, asegúrate de que el script de Gradle tenga permisos de ejecución:
    ```bash
    chmod +x backend/Gestor-De-Proyectos-develop/gradlew
    ```

3.  **Construir y Levantar los Contenedores:**
    Este comando construirá las imágenes del backend y frontend, iniciará los tres contenedores (mongo, backend, frontend) y cargará los datos iniciales en la base de datos.
    ```bash
    docker compose up --build
    ```

4.  **Acceder a la Aplicación:**
    * **Frontend (React):** [http://localhost:3000](http://localhost:3000)
    * **Backend (API):** [http://localhost:8088/gestor](http://localhost:8088/gestor)

---

## Opción 2: Ejecución Local (Windows 10/11)

Este método requiere que instales y configures todo el software manualmente en tu máquina.

### Requisitos Previos (Local)
1.  **Java JDK 17:** Verifica con `java -version`.
2.  **Node.js 18.x LTS:** Verifica con `node -v` (debe ser v18.x) y `npm -v`.
3.  **MongoDB 6.x Community Server:** Debe estar instalado y corriendo como un servicio de Windows.
4.  **MongoDB Shell (`mongosh`):** Verifica con `mongosh --version`. (Si usaste el instalador de MongoDB, asegúrate de que `mongosh.exe` esté en tu PATH del sistema).

### Pasos para Ejecutar Localmente

1.  **Clonar el Repositorio:**
    ```cmd
    git clone [https://github.com/Cdiezlop/Udea_PI1_Gestor_proyectos.git](https://github.com/Cdiezlop/Udea_PI1_Gestor_proyectos.git) GESTOR_DE_PROYECTOS
    cd GESTOR_DE_PROYECTOS
    ```

2.  **Corregir Archivos de Configuración (¡Importante!):**
    * **Backend:** Abre `backend\Gestor-De-Proyectos-develop\src\main\resources\application.yml` y asegúrate de que la URI apunte a `gestor_db`:
        ```yaml
        uri: mongodb://localhost:27017/gestor_db
        ```
    * **Backend (CORS):** Sigue los pasos de depuración para añadir el archivo `CorsConfig.java` si encuentras errores de CORS.
    * **Frontend:** Asegúrate de que los archivos en `frontend\frontend-gestorProyectos-develop\src\services\` y `components\` apunten a la URL correcta (`${API_BASE}/api/...`).

3.  **Cargar Datos en MongoDB:**
    Abre una terminal (`cmd`) en la raíz del proyecto (`GESTOR_DE_PROYECTOS`) y ejecuta:
    ```cmd
    mongosh "mongodb://localhost:27017/gestor_db" --file backend\Gestor-De-Proyectos-develop\scripts\categorias.js
    mongosh "mongodb://localhost:27017/gestor_db" --file backend\Gestor-De-Proyectos-develop\scripts\estados.js
    mongosh "mongodb://localhost:27017/gestor_db" --file backend\Gestor-De-Proyectos-develop\scripts\usuarioAdmin.js
    ```

4.  **Iniciar el Backend:**
    * Abre una **NUEVA** terminal.
    * Navega a la carpeta del backend y ejecuta:
        ```cmd
        cd backend\Gestor-De-Proyectos-develop
        .\gradlew.bat bootRun
        ```
    * *Deja esta terminal abierta.*

5.  **Iniciar el Frontend:**
    * Abre una **TERCERA** terminal.
    * Navega a la carpeta del frontend, instala dependencias (¡incluyendo bootstrap!) e inicia:
        ```cmd
        cd frontend\frontend-gestorProyectos-develop
        npm install
        npm install bootstrap
        npm start
        ```
    * *Deja esta terminal abierta.*

6.  **Acceder a la Aplicación:**
    * Tu navegador debería abrirse automáticamente en [http://localhost:3000](http://localhost:3000).

---
### Autores
- Cristian Diez
- Jhoan Villa