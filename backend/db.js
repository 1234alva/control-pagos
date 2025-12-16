import pkg from "pg";
const { Client } = pkg;

const client = new Client({
  host: "postgres_db",              // nombre del servicio en docker-compose
  port: 5432,
  user: "postgres",
  password: "postgres",    // debe coincidir con docker-compose.yml
  database: "control_pagos"
});

client.connect()
  .then(() => console.log("Conectado a PostgreSQL ✅"))
  .catch(err => console.error("Error de conexión:", err));

export default client;
