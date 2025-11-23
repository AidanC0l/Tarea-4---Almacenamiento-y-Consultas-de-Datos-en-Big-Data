// Inserta 100 documentos de ejemplo en logs
const levels = ["INFO", "WARN", "ERROR"];
const services = ["auth_service", "payment_service", "email_service", "catalog_service"];
for (let i = 0; i < 100; i++) {
  db.logs.insertOne({
    timestamp: new Date(Date.now() - Math.floor(Math.random()*1000*60*60*24*30)), // fecha aleatoria último mes
    level: levels[Math.floor(Math.random()*levels.length)],
    service: services[Math.floor(Math.random()*services.length)],
    message: "Evento de prueba #" + (i+1),
    user_id: Math.floor(Math.random()*5000) + 1,
    response_time_ms: Math.floor(Math.random()*1000), // 0..999 ms
    ip: "192.168.1." + Math.floor(Math.random()*254 + 1)
  });
}
print("Inserción completada — documentos en logs:", db.logs.countDocuments());

// Insertar información en services
db.services.insertMany([
  { service: "auth_service", owner: "Seguridad", version: "1.3.4", status: "active" },
  { service: "payment_service", owner: "Pagos", version: "2.1.0", status: "active" },
  { service: "email_service", owner: "Comunicaciones", version: "1.0.2", status: "degraded" },
  { service: "catalog_service", owner: "Productos", version: "3.0.1", status: "active" }
])
db.services.find().pretty()
