/// ==========================================
// ARCHIVO: datos_prueba.js
// USO: mongo "mongodb://localhost:27017/gestor_db" datos_prueba.js
// ==========================================

// Seleccionar base de datos
db = db.getSiblingDB('gestor_db');

// ==========================================
// 1. LIMPIEZA PREVIA
// ==========================================
// Borramos todos los usuarios MENOS el admin (ID 1)
db.usuario.deleteMany({ _id: { $ne: "1" } }); 
// Borramos todos los proyectos para regenerarlos
db.proyectos.deleteMany({});

print("Base de datos limpiada (Admin preservado).");

// ==========================================
// 2. CREACIÓN DE USUARIOS
// ==========================================
const usuarios = [
  // --- USUARIOS BÁSICOS ---
  {
    _id: "101",
    nombre: "Laura",
    apellidos: "Restrepo",
    edad: 25,
    estrato: 3,
    ciudad: "Bogotá",
    user: "laura.res",
    password: "123",
    rol: "Basico",
    email: "laura.res@empresa.com",
    fechaCreacion: new Date(),
    fechaModificacion: new Date()
  },
  {
    _id: "102",
    nombre: "Carlos",
    apellidos: "Méndez",
    edad: 34,
    estrato: 4,
    ciudad: "Medellín",
    user: "carlos.men",
    password: "123",
    rol: "Basico",
    email: "carlos.men@tech.co",
    fechaCreacion: new Date(),
    fechaModificacion: new Date()
  },
  {
    _id: "103",
    nombre: "Ana",
    apellidos: "Gómez",
    edad: 29,
    estrato: 2,
    ciudad: "Cali",
    user: "ana.gom",
    password: "123",
    rol: "Basico",
    email: "ana.gom@social.org",
    fechaCreacion: new Date(),
    fechaModificacion: new Date()
  },
  {
    _id: "104",
    nombre: "Jorge",
    apellidos: "Velásquez",
    edad: 45,
    estrato: 5,
    ciudad: "Barranquilla",
    user: "jorge.vel",
    password: "123",
    rol: "Basico",
    email: "jorge.vel@constructora.com",
    fechaCreacion: new Date(),
    fechaModificacion: new Date()
  },
  {
    _id: "105",
    nombre: "Sofía",
    apellidos: "Vergara",
    edad: 22,
    estrato: 6,
    ciudad: "Cartagena",
    user: "sofia.ver",
    password: "123",
    rol: "Basico",
    email: "sofia.ver@uni.edu.co",
    fechaCreacion: new Date(),
    fechaModificacion: new Date()
  },
  // --- USUARIOS ENCARGADOS (Jhoan y Cristian) ---
  {
    _id: "106",
    nombre: "Jhoan",
    apellidos: "Villa",
    edad: 26,
    estrato: 3,
    ciudad: "Medellín",
    user: "jhoan.villa", // Corregido el user para consistencia
    password: "123",
    rol: "Encargado",
    email: "jhoan.villa@udea.edu.co", 
    fechaCreacion: new Date(),
    fechaModificacion: new Date()
  },
  {
    _id: "107",
    nombre: "Cristian",
    apellidos: "Diez",
    edad: 25,
    estrato: 3,
    ciudad: "Medellín",
    user: "cristian.diez",
    password: "123", // Estandarizado a 123
    rol: "Encargado",
    email: "cristian.diez@udea.edu.co", 
    fechaCreacion: new Date(),
    fechaModificacion: new Date()
  }
];

db.usuario.insertMany(usuarios);
print("Usuarios insertados correctamente.");

// ==========================================
// 3. CREACIÓN DE PROYECTOS
// ==========================================

const proyectos = [
  // --- Proyectos de Laura (101) ---
  {
    nombre: "Sistema de Riego Automatizado",
    descripcion: "Implementación de sensores IoT para optimizar el agua en cultivos de papa.",
    userId: "101",
    categoria: "Tecnología",
    presupuesto: 15000000,
    fechaInicio: new Date("2025-02-01"),
    fechaPrimerAvance: new Date("2025-04-01"),
    fechaCompromiso: new Date("2025-08-01"),
    fechaFinalizacion: new Date("2025-08-01"),
    duracion: 6,
    estado: "En ejecución",
    fechaCreacion: new Date(),
    fechaModificacion: new Date(),
    observacionesIniciales: "Se requiere importación de sensores.",
    responsables: [{ nombre: "Laura Restrepo", edad: 25, rol: "Líder Técnico", telefono: "3001234567", correo: "laura.res@empresa.com" }]
  },
  {
    nombre: "Capacitación en TIC para Adultos",
    descripcion: "Talleres prácticos de uso de smartphones y computadores.",
    userId: "101",
    categoria: "Educación",
    presupuesto: 5000000,
    fechaInicio: new Date("2025-03-01"),
    fechaPrimerAvance: new Date("2025-03-15"),
    fechaCompromiso: new Date("2025-06-01"),
    fechaFinalizacion: new Date("2025-06-01"),
    duracion: 3,
    estado: "Por revisar",
    fechaCreacion: new Date(),
    fechaModificacion: new Date(),
    observacionesIniciales: "Pendiente confirmar salón comunal.",
    responsables: [{ nombre: "Marta Lucía", edad: 40, rol: "Pedagoga", telefono: "3201112233", correo: "marta@edu.co" }]
  },
  {
    nombre: "Reciclaje Inteligente en Oficina",
    descripcion: "Campaña y ubicación de puntos ecológicos con QR.",
    userId: "101",
    categoria: "Ambiental",
    presupuesto: 2000000,
    fechaInicio: new Date("2025-01-15"),
    fechaPrimerAvance: new Date("2025-02-15"),
    fechaCompromiso: new Date("2025-04-15"),
    fechaFinalizacion: new Date("2025-04-15"),
    duracion: 3,
    estado: "Aceptado",
    fechaCreacion: new Date(),
    fechaModificacion: new Date(),
    observacionesIniciales: "Material gráfico listo.",
    responsables: [{ nombre: "Laura Restrepo", edad: 25, rol: "Coordinadora", telefono: "3001234567", correo: "laura.res@empresa.com" }],
    comentarios: { user: "admin", fechaComentarios: new Date(), tipoComentario: "Proyecto aceptado", comentario: "Excelente iniciativa." }
  },
  {
    nombre: "Gestión de Residuos Sólidos",
    descripcion: "Plan piloto para el manejo de residuos en el barrio La Floresta.",
    userId: "101",
    categoria: "Ambiental",
    presupuesto: 8000000,
    fechaInicio: new Date("2025-06-01"),
    fechaPrimerAvance: new Date("2025-07-01"),
    fechaCompromiso: new Date("2025-12-01"),
    fechaFinalizacion: new Date("2025-12-01"),
    duracion: 6,
    estado: "Por revisar",
    fechaCreacion: new Date(),
    fechaModificacion: new Date(),
    observacionesIniciales: "Esperando aval de la JAC.",
    responsables: [{ nombre: "Juan Perez", edad: 30, rol: "Gestor Ambiental", telefono: "3009988776", correo: "juan@eco.com" }]
  },

  // --- Proyectos de Carlos (102) ---
  {
    nombre: "App Móvil de Domicilios",
    descripcion: "Plataforma para conectar tiendas de barrio con vecinos.",
    userId: "102",
    categoria: "Emprendimiento",
    presupuesto: 25000000,
    fechaInicio: new Date("2025-05-01"),
    fechaPrimerAvance: new Date("2025-07-01"),
    fechaCompromiso: new Date("2025-12-01"),
    fechaFinalizacion: new Date("2025-12-01"),
    duracion: 7,
    estado: "Por revisar",
    fechaCreacion: new Date(),
    fechaModificacion: new Date(),
    observacionesIniciales: "Buscando financiación semilla.",
    responsables: [{ nombre: "Carlos Méndez", edad: 34, rol: "Backend Dev", telefono: "3155556677", correo: "carlos@tech.co" }]
  },
  {
    nombre: "Torneo de Fútbol Interbarrios",
    descripcion: "Organización de campeonato para fomentar el deporte.",
    userId: "102",
    categoria: "Deportivo",
    presupuesto: 8000000,
    fechaInicio: new Date("2025-06-01"),
    fechaPrimerAvance: new Date("2025-06-15"),
    fechaCompromiso: new Date("2025-09-01"),
    fechaFinalizacion: new Date("2025-09-01"),
    duracion: 3,
    estado: "Rechazado",
    fechaCreacion: new Date(),
    fechaModificacion: new Date(),
    observacionesIniciales: "Se requiere apoyo de la alcaldía.",
    responsables: [{ nombre: "Carlos Méndez", edad: 34, rol: "Organizador", telefono: "3155556677", correo: "carlos@tech.co" }],
    comentarios: { user: "admin", fechaComentarios: new Date(), tipoComentario: "Proyecto rechazado", comentario: "Presupuesto excede límites." }
  },
  {
    nombre: "Huerta Urbana Comunitaria",
    descripcion: "Espacio de cultivo en terraza del edificio.",
    userId: "102",
    categoria: "Ambiental",
    presupuesto: 1500000,
    fechaInicio: new Date("2025-02-01"),
    fechaPrimerAvance: new Date("2025-03-01"),
    fechaCompromiso: new Date("2025-08-01"),
    fechaFinalizacion: new Date("2025-08-01"),
    duracion: 6,
    estado: "En ejecución",
    fechaCreacion: new Date(),
    fechaModificacion: new Date(),
    observacionesIniciales: "Permisos concedidos.",
    responsables: [{ nombre: "Doña Gloria", edad: 60, rol: "Voluntaria", telefono: "3001110000", correo: "gloria@vecinos.com" }]
  },
  {
    nombre: "Plataforma Freelance Local",
    descripcion: "Sitio web para contratar oficios varios en la ciudad.",
    userId: "102",
    categoria: "Tecnología",
    presupuesto: 18000000,
    fechaInicio: new Date("2025-03-01"),
    fechaPrimerAvance: new Date("2025-05-01"),
    fechaCompromiso: new Date("2025-11-01"),
    fechaFinalizacion: new Date("2025-11-01"),
    duracion: 8,
    estado: "Aceptado",
    fechaCreacion: new Date(),
    fechaModificacion: new Date(),
    observacionesIniciales: "Diseño UI terminado.",
    responsables: [{ nombre: "Luisa Fernanda", edad: 28, rol: "Frontend Dev", telefono: "3167778899", correo: "luisa@tech.co" }]
  },

  // --- Proyectos de Ana (103) ---
  {
    nombre: "Apoyo Psicosocial a Víctimas",
    descripcion: "Jornadas de acompañamiento y escucha.",
    userId: "103",
    categoria: "Social",
    presupuesto: 12000000,
    fechaInicio: new Date("2025-03-01"),
    fechaPrimerAvance: new Date("2025-04-01"),
    fechaCompromiso: new Date("2025-12-30"),
    fechaFinalizacion: new Date("2025-12-30"),
    duracion: 10,
    estado: "Aceptado",
    fechaCreacion: new Date(),
    fechaModificacion: new Date(),
    observacionesIniciales: "Convenio con universidad.",
    responsables: [{ nombre: "Ana Gómez", edad: 29, rol: "Psicóloga", telefono: "3112223344", correo: "ana@social.org" }],
    comentarios: { user: "admin", fechaComentarios: new Date(), tipoComentario: "Proyecto aceptado", comentario: "Proyecto de alto impacto aprobado." }
  },
  {
    nombre: "Festival de Cine Independiente",
    descripcion: "Proyección de cortos nacionales en parques.",
    userId: "103",
    categoria: "Cultural",
    presupuesto: 30000000,
    fechaInicio: new Date("2025-09-01"),
    fechaPrimerAvance: new Date("2025-09-15"),
    fechaCompromiso: new Date("2025-10-01"),
    fechaFinalizacion: new Date("2025-10-01"),
    duracion: 1,
    estado: "Por revisar",
    fechaCreacion: new Date(),
    fechaModificacion: new Date(),
    observacionesIniciales: "Buscando patrocinadores.",
    responsables: [{ nombre: "Julián David", edad: 32, rol: "Productor", telefono: "3105559988", correo: "julian@cine.co" }]
  },
  {
    nombre: "Red de Bibliotecas Barriales",
    descripcion: "Puntos de intercambio de libros usados.",
    userId: "103",
    categoria: "Cultural",
    presupuesto: 500000,
    fechaInicio: new Date("2025-01-10"),
    fechaPrimerAvance: new Date("2025-01-20"),
    fechaCompromiso: new Date("2025-12-31"),
    fechaFinalizacion: new Date("2025-12-31"),
    duracion: 12,
    estado: "En ejecución",
    fechaCreacion: new Date(),
    fechaModificacion: new Date(),
    observacionesIniciales: "Iniciativa de bajo costo.",
    responsables: [{ nombre: "Ana Gómez", edad: 29, rol: "Gestora", telefono: "3112223344", correo: "ana@social.org" }]
  },

  // --- Proyectos de Jorge (104) ---
  {
    nombre: "Modernización Redes Eléctricas",
    descripcion: "Actualización de cableado en sector industrial.",
    userId: "104",
    categoria: "Otra",
    presupuesto: 150000000,
    fechaInicio: new Date("2025-02-01"),
    fechaPrimerAvance: new Date("2025-05-01"),
    fechaCompromiso: new Date("2025-11-01"),
    fechaFinalizacion: new Date("2025-11-01"),
    duracion: 9,
    estado: "Atrasado",
    fechaCreacion: new Date(),
    fechaModificacion: new Date(),
    observacionesIniciales: "Depende de importación.",
    responsables: [{ nombre: "Jorge Velásquez", edad: 45, rol: "Ing. Civil", telefono: "3009998877", correo: "jorge@constructora.com" }],
    comentarios: { user: "admin", fechaComentarios: new Date(), tipoComentario: "Actualización de estado", comentario: "Retraso en aduanas." }
  },
  {
    nombre: "Pavimentación Vía Principal",
    descripcion: "Reparcheo y señalización vial.",
    userId: "104",
    categoria: "Otra",
    presupuesto: 80000000,
    fechaInicio: new Date("2025-01-01"),
    fechaPrimerAvance: new Date("2025-02-01"),
    fechaCompromiso: new Date("2025-04-01"),
    fechaFinalizacion: new Date("2025-04-01"),
    duracion: 3,
    estado: "Terminado",
    fechaCreacion: new Date(),
    fechaModificacion: new Date(),
    observacionesIniciales: "Obra prioritaria.",
    responsables: [{ nombre: "Jorge Velásquez", edad: 45, rol: "Director", telefono: "3009998877", correo: "jorge@constructora.com" }],
    comentarios: { user: "admin", fechaComentarios: new Date(), tipoComentario: "Actualización de estado", comentario: "Entrega a satisfacción." }
  },
  {
    nombre: "Diseño de Parque Infantil",
    descripcion: "Planos y renderización de nuevo parque.",
    userId: "104",
    categoria: "Innovación",
    presupuesto: 5000000,
    fechaInicio: new Date("2025-08-01"),
    fechaPrimerAvance: new Date("2025-08-15"),
    fechaCompromiso: new Date("2025-09-30"),
    fechaFinalizacion: new Date("2025-09-30"),
    duracion: 2,
    estado: "Aplazado",
    fechaCreacion: new Date(),
    fechaModificacion: new Date(),
    observacionesIniciales: "A la espera de lote.",
    responsables: [{ nombre: "Mariana Lopez", edad: 26, rol: "Arquitecta", telefono: "3123334455", correo: "mariana@arq.com" }],
    comentarios: { user: "admin", fechaComentarios: new Date(), tipoComentario: "Actualización de estado", comentario: "Suspendido temporalmente." }
  },

  // --- Proyectos de Sofía (105) ---
  {
    nombre: "Investigación de Corales",
    descripcion: "Estudio de blanqueamiento en Islas del Rosario.",
    userId: "105",
    categoria: "Ambiental",
    presupuesto: 45000000,
    fechaInicio: new Date("2025-01-20"),
    fechaPrimerAvance: new Date("2025-03-20"),
    fechaCompromiso: new Date("2025-12-20"),
    fechaFinalizacion: new Date("2025-12-20"),
    duracion: 11,
    estado: "En ejecución",
    fechaCreacion: new Date(),
    fechaModificacion: new Date(),
    observacionesIniciales: "Requiere equipo de buceo.",
    responsables: [{ nombre: "Sofía Vergara", edad: 22, rol: "Bióloga", telefono: "3005551234", correo: "sofia@uni.edu.co" }]
  },
  {
    nombre: "Taller de Robótica para Niños",
    descripcion: "Curso vacacional de introducción a Arduino.",
    userId: "105",
    categoria: "Educación",
    presupuesto: 3000000,
    fechaInicio: new Date("2025-06-15"),
    fechaPrimerAvance: new Date("2025-06-30"),
    fechaCompromiso: new Date("2025-07-15"),
    fechaFinalizacion: new Date("2025-07-15"),
    duracion: 1,
    estado: "Por revisar",
    fechaCreacion: new Date(),
    fechaModificacion: new Date(),
    observacionesIniciales: "Kits incluidos.",
    responsables: [{ nombre: "Sofía Vergara", edad: 22, rol: "Instructora", telefono: "3005551234", correo: "sofia@uni.edu.co" }]
  },
  {
    nombre: "Start-up Turismo Sostenible",
    descripcion: "Plataforma web para ecoturismo.",
    userId: "105",
    categoria: "Emprendimiento",
    presupuesto: 10000000,
    fechaInicio: new Date("2025-02-01"),
    fechaPrimerAvance: new Date("2025-04-01"),
    fechaCompromiso: new Date("2025-10-01"),
    fechaFinalizacion: new Date("2025-10-01"),
    duracion: 8,
    estado: "Aceptado",
    fechaCreacion: new Date(),
    fechaModificacion: new Date(),
    observacionesIniciales: "Validación realizada.",
    responsables: [
      { nombre: "Sofía Vergara", edad: 22, rol: "CEO", telefono: "3005551234", correo: "sofia@uni.edu.co" },
      { nombre: "Andrés Felipe", edad: 24, rol: "CTO", telefono: "3009991111", correo: "andres@dev.com" }
    ],
    comentarios: { user: "admin", fechaComentarios: new Date(), tipoComentario: "Proyecto aceptado", comentario: "Propuesta viable." }
  },

  // --- PROYECTOS DE JHOAN (106) ---
  {
    nombre: "Migración Nube Alcaldía",
    descripcion: "Traslado de infraestructura on-premise a AWS.",
    userId: "106",
    categoria: "Tecnología",
    presupuesto: 60000000,
    fechaInicio: new Date("2025-02-01"),
    fechaPrimerAvance: new Date("2025-04-01"),
    fechaCompromiso: new Date("2025-10-01"),
    fechaFinalizacion: new Date("2025-10-01"),
    duracion: 8,
    estado: "Por revisar",
    fechaCreacion: new Date(),
    fechaModificacion: new Date(),
    observacionesIniciales: "Pendiente aprobación de presupuesto.",
    responsables: [{ nombre: "Jhoan Villa", edad: 26, rol: "Arquitecto Cloud", telefono: "3208889900", correo: "jhoan.villa@udea.edu.co" }]
  },
  {
    nombre: "Sistema de Votación Blockchain",
    descripcion: "Prototipo de votación segura para juntas directivas.",
    userId: "106",
    categoria: "Innovación",
    presupuesto: 35000000,
    fechaInicio: new Date("2025-03-15"),
    fechaPrimerAvance: new Date("2025-05-15"),
    fechaCompromiso: new Date("2025-09-15"),
    fechaFinalizacion: new Date("2025-09-15"),
    duracion: 6,
    estado: "En ejecución",
    fechaCreacion: new Date(),
    fechaModificacion: new Date(),
    observacionesIniciales: "Smart contracts en desarrollo.",
    responsables: [{ nombre: "Jhoan Villa", edad: 26, rol: "Líder Técnico", telefono: "3208889900", correo: "jhoan.villa@udea.edu.co" }]
  },
  {
    nombre: "Auditoría Seguridad Informática",
    descripcion: "Pruebas de penetración a sistemas financieros.",
    userId: "106",
    categoria: "Tecnología",
    presupuesto: 20000000,
    fechaInicio: new Date("2025-01-05"),
    fechaPrimerAvance: new Date("2025-01-25"),
    fechaCompromiso: new Date("2025-03-05"),
    fechaFinalizacion: new Date("2025-03-05"),
    duracion: 2,
    estado: "Terminado",
    fechaCreacion: new Date(),
    fechaModificacion: new Date(),
    observacionesIniciales: "Acceso concedido bajo NDA.",
    responsables: [{ nombre: "Jhoan Villa", edad: 26, rol: "Auditor", telefono: "3208889900", correo: "jhoan.villa@udea.edu.co" }],
    comentarios: { user: "admin", fechaComentarios: new Date(), tipoComentario: "Actualización de estado", comentario: "Informe final entregado." }
  },

  // --- PROYECTOS DE CRISTIAN (107) ---
  {
    nombre: "App Realidad Aumentada Turismo",
    descripcion: "Guía turística interactiva para el centro histórico.",
    userId: "107",
    categoria: "Innovación",
    presupuesto: 40000000,
    fechaInicio: new Date("2025-04-01"),
    fechaPrimerAvance: new Date("2025-06-01"),
    fechaCompromiso: new Date("2025-12-01"),
    fechaFinalizacion: new Date("2025-12-01"),
    duracion: 8,
    estado: "Por revisar",
    fechaCreacion: new Date(),
    fechaModificacion: new Date(),
    observacionesIniciales: "Requiere modelos 3D detallados.",
    responsables: [{ nombre: "Cristian Diez", edad: 25, rol: "Líder AR", telefono: "3507649727", correo: "cristian.diez@udea.edu.co" }]
  },
  {
    nombre: "Automatización Procesos Legales",
    descripcion: "Bot para clasificación de tutelas y demandas.",
    userId: "107",
    categoria: "Tecnología",
    presupuesto: 25000000,
    fechaInicio: new Date("2025-02-10"),
    fechaPrimerAvance: new Date("2025-04-10"),
    fechaCompromiso: new Date("2025-08-10"),
    fechaFinalizacion: new Date("2025-08-10"),
    duracion: 6,
    estado: "Aceptado",
    fechaCreacion: new Date(),
    fechaModificacion: new Date(),
    observacionesIniciales: "Base de datos jurídica adquirida.",
    responsables: [{ nombre: "Cristian Diez", edad: 25, rol: "Desarrollador", telefono: "3507649727", correo: "cristian.diez@udea.edu.co" }],
    comentarios: { user: "admin", fechaComentarios: new Date(), tipoComentario: "Proyecto aceptado", comentario: "Automatización aprobada." }
  },
  {
    nombre: "Dashboard Analítica Datos",
    descripcion: "Visualización de indicadores de gestión pública.",
    userId: "107",
    categoria: "Tecnología",
    presupuesto: 15000000,
    fechaInicio: new Date("2025-01-15"),
    fechaPrimerAvance: new Date("2025-02-15"),
    fechaCompromiso: new Date("2025-05-15"),
    fechaFinalizacion: new Date("2025-05-15"),
    duracion: 4,
    estado: "En ejecución",
    fechaCreacion: new Date(),
    fechaModificacion: new Date(),
    observacionesIniciales: "Conexión a APIs establecida.",
    responsables: [{ nombre: "Cristian Diez", edad: 25, rol: "Analista de Datos", telefono: "3507649727", correo: "cristian.diez@udea.edu.co" }]
  }
];

db.proyectos.insertMany(proyectos);
print("Proyectos insertados correctamente.");