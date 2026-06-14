const mysql = require("mysql2/promise");
require('dotenv').config();

async function runMigration() {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "",
    port: process.env.DB_PORT || 3306,
  });

  console.log("Conectado ao MariaDB para migração...");

  try {
    const dbName = process.env.DB_NAME || "trabalhopadb";
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${dbName}\``);
    await connection.query(`USE \`${dbName}\``);

    console.log(`Banco de dados '${dbName}' garantido.`);

    await connection.query(`
      CREATE TABLE IF NOT EXISTS users (
        id VARCHAR(36) PRIMARY KEY,
        username VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    await connection.query(`
      CREATE TABLE IF NOT EXISTS activities (
        id VARCHAR(36) PRIMARY KEY,
        user_id VARCHAR(36),
        activity VARCHAR(255) NOT NULL,
        completed BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
      )
    `);

    console.log("Tabelas 'users' e 'activities' garantidas.");
  } catch (error) {
    console.error("Erro durante a migração:", error);
  } finally {
    await connection.end();
  }
}

runMigration();
