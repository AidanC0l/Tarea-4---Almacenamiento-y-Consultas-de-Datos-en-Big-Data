// Encontrar errores (ERROR)
db.logs.find({ level: "ERROR" }).count()

// Buscar logs con response_time > 500 ms
db.logs.find({ response_time_ms: { $gt: 500 } }).limit(10).pretty()

// Logs de un usuario específico
db.logs.find({ user_id: 1023 }).pretty()

// Logs entre dos fechas (ejemplo)
const from = new Date("2025-10-01T00:00:00Z");
const to   = new Date("2025-10-31T23:59:59Z");
db.logs.find({ timestamp: { $gte: from, $lte: to } }).count()
