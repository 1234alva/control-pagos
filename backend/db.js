const { Client } = require("pg");

const client = new Client({
    host: "postgres_db",        // nombre del servicio en docker-compose
    port: 5432,
    user: "postgres",
    password: "123qwe",
    database: "control_pagos"
});

client.connect()
module.exports = client;
