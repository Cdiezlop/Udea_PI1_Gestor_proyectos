// Seleccionar base de datos
db = db.getSiblingDB('gestor_db');

// Insertar estados por defecto
db.estado.insertMany([
  { name: "Por revisar" },
  { name: "Aceptado" },
  { name: "En ejecución" },
  { name: "Rechazado" },
  { name: "Atrasado" },
  { name: "Terminado" },
  { name: "Aplazado" }
]);
