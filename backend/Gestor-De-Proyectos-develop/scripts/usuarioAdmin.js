// Seleccionar base de datos
db = db.getSiblingDB('gestor_db');

// Eliminar si existe para evitar duplicados o conflictos
db.usuario.deleteOne({ _id: "1" });

// Insertar usuario administrador inicial con los nuevos campos
db.usuario.insertOne({
  _id: "1",
  nombre: "Adminnistrador",
  apellidos: "Principal",
  edad: 0,
  estrato: 0,
  fechaCreacion: new Date(),
  fechaModificacion: new Date(),
  ciudad: "Medellín",
  user: "admin",
  password: "admin123",
  rol: "admin",
  email: "cristian.diez@udea.edu.co" // Nuevo campo obligatorio
});
