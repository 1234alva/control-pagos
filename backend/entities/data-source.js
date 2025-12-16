import "reflect-metadata";
import { DataSource } from "typeorm";
import { Usuario } from "./entities/usuario.entity.js";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "postgres_db",          // 👈 nombre del servicio en docker-compose
  port: 5432,
  username: "postgres",
  password: "postgres",
  database: "control_pagos",
  entities: [Usuario],
  synchronize: true,   // crea/actualiza tablas automáticamente
  logging: true,       // muestra queries en consola
});
