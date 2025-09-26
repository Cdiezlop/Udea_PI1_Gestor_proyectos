# Gestor de Proyectos

Proyecto Integrador I - Universidad de Antioquia

## Estructura del repositorio
```
GestorDeProyectos/
│── backend/    # Proyecto Spring Boot (Java + MongoDB)
│── frontend/   # Proyecto React
│── README.md   # Guía de instalación
│── .gitignore
```

## Instrucciones
### Backend
1. Entrar a `backend/`
2. Configurar MongoDB en `application.properties`
   ```properties
   spring.data.mongodb.uri=mongodb://localhost:27017/gestor_proyectos
   server.port=8080
   ```
3. Ejecutar con Maven:
   ```bash
mvn spring-boot:run
```
   El servidor corre en `http://localhost:8080`

### Frontend
1. Entrar a `frontend/`
2. Instalar dependencias:
   ```bash
npm install
```
3. Ejecutar la app:
   ```bash
npm start
```
   La app corre en `http://localhost:3000`
