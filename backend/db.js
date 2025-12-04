const { Client } = require("pg");

const client = new Client({
    host: "db",        // nombre del servicio en docker-compose
    port: 5432,
    user: "postgres",
    password: "123qwe",
    database: "pagos"
});

client.connect()
.then(() => console.log("Conectado a PostgreSQL 🚀"))
.catch(err => console.error("Error de conexión", err));

module.exports = client;
// backend/db.js
