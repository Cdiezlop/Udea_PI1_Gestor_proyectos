# Gestor de Proyectos
**Proyecto Integrador I – Universidad de Antioquia** Aplicación web para la gestión integral de proyectos, desarrollada con una arquitectura moderna de microservicios monolíticos utilizando Spring Boot (Backend) y React (Frontend), respaldada por una base de datos no relacional MongoDB.

El sistema permite la administración de usuarios, roles (Solicitante y Revisor), y el ciclo de vida completo de un proyecto, desde su creación con múltiples responsables hasta su aprobación y seguimiento.

---

## Tecnologías Utilizadas

* **Backend:** Java 17, Spring Boot 3.x, Gradle
* **Frontend:** React 18, Node.js 18 LTS, Bootstrap
* **Base de Datos:** MongoDB 6.x
* **Contenedores:** Docker y Docker Compose

---

## Datos de Acceso (Credenciales)

El sistema cuenta con datos semilla y de prueba para validar todas las funcionalidades.

### Usuario Administrador (Rol: Revisor)
| Rol | Usuario | Contraseña | Correo |
| :--- | :--- | :--- | :--- |
| **Admin** | `admin` | `admin123` | admin@gestorproyectos.com |

### Usuarios Básicos (Rol: Solicitante)
Estos usuarios se generan automáticamente al cargar el script `datos_prueba.js`.

| Usuario | Contraseña | Rol |
| :--- | :--- | :--- |
| `laura.res` | `123` | Básico |
| `carlos.men` | `123` | Básico |
| `ana.gom` | `123` | Básico |
| `jorge.vel` | `123` | Básico |
| `sofia.ver` | `123` | Básico |

**Conexión BD Local:** `mongodb://localhost:27017/gestor_db`

---

## Opción 1: Ejecución con Docker (Recomendado)

Método automatizado que no requiere instalar dependencias manualmente.

### Requisitos
* [Docker Desktop](https://www.docker.com/products/docker-desktop/) instalado.

### Pasos
1.  **Clonar el repositorio:**
    ```bash
    git clone [https://github.com/Cdiezlop/Udea_PI1_Gestor_proyectos.git](https://github.com/Cdiezlop/Udea_PI1_Gestor_proyectos.git) GESTOR_DE_PROYECTOS
    cd GESTOR_DE_PROYECTOS
    ```
2.  **Ejecutar:**
    ```bash
    docker compose up --build
    ```
    Esto levantará MongoDB, cargará los datos iniciales, y desplegará el Backend (puerto 8088) y Frontend (puerto 3000).

---

## Opción 2: Ejecución Local (Windows 10/11)

Guía detallada para ejecutar el entorno de desarrollo en Windows.

### Requisitos Previos
1.  **Java JDK 17**
2.  **Node.js 18.x LTS**
3.  **MongoDB 6.x** (Corriendo como servicio)
4.  **MongoDB Shell (`mongosh`)**

### Pasos de Ejecución

#### 1. Preparación de la Base de Datos
Abre una terminal (PowerShell o CMD) en la raíz del proyecto y ejecuta los siguientes comandos para **limpiar** la base de datos y **cargar** datos frescos.

**A. Limpiar Base de Datos:**
```bash
mongosh "mongodb://localhost:27017/gestor_db" --eval "db.proyectos.deleteMany({}); db.compromiso.deleteMany({}); db.categoria.deleteMany({}); db.estado.deleteMany({}); db.usuario.deleteMany({});"
```

**B. Cargar Datos Iniciales (Configuración y Admin):**
```bash
mongosh "mongodb://localhost:27017/gestor_db" --file backend\Gestor-De-Proyectos-develop\scripts\categorias.js
```

```bash
mongosh "mongodb://localhost:27017/gestor_db" --file backend\Gestor-De-Proyectos-develop\scripts\estados.js
```

```bash
mongosh "mongodb://localhost:27017/gestor_db" --file backend\Gestor-De-Proyectos-develop\scripts\usuarioAdmin.js
```

**C. Cargar Datos de Prueba (Usuarios y Proyectos):**
```bash
mongosh "mongodb://localhost:27017/gestor_db" --file backend\Gestor-De-Proyectos-develop\scripts\datos_prueba.js
```

#### 2.  **Iniciar el Backend:**
    * Abre una **NUEVA** terminal.
    * Navega a la carpeta del backend y ejecuta:
        ```cmd
        cd backend\Gestor-De-Proyectos-develop
        .\gradlew.bat bootRun
        ```
    * *Deja esta terminal abierta.*

#### 3.  **Iniciar el Frontend:**
    * Abre una **TERCERA** terminal.
    * Navega a la carpeta del frontend, instala dependencias (¡incluyendo bootstrap!) e inicia:
        ```cmd
        cd frontend\frontend-gestorProyectos-develop
        npm install
        npm install bootstrap
        npm start
        ```
    * *Deja esta terminal abierta.*

#### 4.  **Acceder a la Aplicación:**
    * Tu navegador debería abrirse automáticamente en [http://localhost:3000](http://localhost:3000).


---
# Autores
- Cristian Diez
- Jhoan Villa