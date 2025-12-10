const { Client } = require("pg");

const client = new Client({
    host: "db",              // nombre del servicio en docker-compose
    port: 5432,
    user: "postgres",
    password: "postgres",    // debe coincidir con docker-compose.yml
    database: "control_pagos"
});

client.connect();
module.exports = client;
