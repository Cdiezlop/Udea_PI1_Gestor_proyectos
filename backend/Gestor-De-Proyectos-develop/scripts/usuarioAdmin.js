// Seleccionar base de datos
db = db.getSiblingDB('gestor_db');

// Insertar usuario administrador inicial
db.usuario.insertOne({
  _id: "1",
  nombre: "Admin",
  apellidos: "Principal",
  edad: 99,
  estrato: 10,
  fechaCreacion: new Date(),
  fechaModificacion: new Date(),
  ciudad: "Medellín",
  user: "admin",
  password: "admin123",
  rol: "admin"
});
