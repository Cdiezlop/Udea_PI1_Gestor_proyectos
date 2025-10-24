// Seleccionar base de datos
db = db.getSiblingDB('gestor_db');

// Insertar categorías iniciales
db.categoria.insertMany([
  { _id: "1", name: "Innovación" },
  { _id: "2", name: "Educación" },
  { _id: "3", name: "Ambiental" },
  { _id: "4", name: "Social" },
  { _id: "5", name: "Emprendimiento" },
  { _id: "6", name: "Cultural" },
  { _id: "7", name: "Deportivo" },
  { _id: "8", name: "Tecnología" },
  { _id: "9", name: "Otra" }
]);
