// Contar registros por nivel
db.logs.aggregate([
  { $group: { _id: "$level", total: { $sum: 1 } } },
  { $sort: { total: -1 } }
]).pretty()

// Tiempo de respuesta promedio por servicio
db.logs.aggregate([
  { $group: { _id: "$service", avgResponseMs: { $avg: "$response_time_ms" }, count: { $sum: 1 } } },
  { $sort: { avgResponseMs: -1 } }
]).pretty()

// Servicio con más errores
db.logs.aggregate([
  { $match: { level: "ERROR" } },
  { $group: { _id: "$service", errors: { $sum: 1 } } },
  { $sort: { errors: -1 } },
  { $limit: 5 }
]).pretty()

// Cantidad de logs por día
db.logs.aggregate([
  { $group: {
      _id: { $dateToString: { format: "%Y-%m-%d", date: "$timestamp" } },
      total: { $sum: 1 }
    }
  },
  { $sort: { _id: 1 } }
]).pretty()

// Percentil o distribución del response_time
db.logs.aggregate([
  { $bucket: {
      groupBy: "$response_time_ms",
      boundaries: [0, 100, 200, 300, 400, 500, 1000],
      default: "1000+",
      output: { count: { $sum: 1 }, avg: { $avg: "$response_time_ms" } }
  }}
]).pretty()
