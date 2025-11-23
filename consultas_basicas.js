// Insertar
db.logs.insertOne({
  timestamp: new Date(),
  level: "INFO",
  service: "auth_service",
  message: "Usuario logueado",
  user_id: 1234,
  response_time_ms: 85,
  ip: "192.168.1.200"
})

// Seleccionar
// Todos (limitado en 10)
db.logs.find().limit(10).pretty()
// Por servicio
db.logs.find({ service: "auth_service" }).limit(4).pretty()

// Actualizar
// Actualizar un documento: cambia level ERROR -> WARN (solo 1)
db.logs.updateOne({ level: "ERROR" }, { $set: { level: "WARN" } })
// Actualizar múltiples: marcar ip 192.168.1.1 como 'internal' (ejemplo)
db.logs.updateMany({ ip: { $regex: "^192\\.168\\.1\\." } }, { $set: { internal: true } })

// Eliminar
// Eliminar un documento
db.logs.deleteOne({ message: "Evento de prueba #1" })
// Eliminar varios 
db.logs.deleteMany({ level: "INFO" , service: "email_service" })



