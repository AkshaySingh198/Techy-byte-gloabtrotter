const { Sequelize } = require('sequelize');
const mysql = require('mysql2/promise');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

const dialect = process.env.DB_DIALECT || 'mysql';
const host = process.env.DB_HOST || 'localhost';
const port = process.env.DB_PORT || 3306;
const username = process.env.DB_USER || 'dev';
const password = process.env.DB_PASS || '';
const database = process.env.DB_NAME || 'globetotter';

let sequelize;

if (dialect === 'mysql') {
  sequelize = new Sequelize(database, username, password, {
    host,
    port,
    dialect: 'mysql',
    logging: false, // Turn off verbose SQL query console logging
    pool: { max: 10, min: 0, acquire: 30000, idle: 10000 },
    define: { timestamps: true, underscored: true }
  });
} else {
  sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: path.join(__dirname, '../database.sqlite'),
    logging: false,
    define: { timestamps: true, underscored: true }
  });
}

async function connectDB() {
  if (dialect === 'mysql') {
    try {
      const connection = await mysql.createConnection({ host, port, user: username, password });
      await connection.query(`CREATE DATABASE IF NOT EXISTS \`${database}\`;`);
      await connection.end();

      await sequelize.authenticate();
      console.log(`[Database] Connected successfully to MySQL database (${database}) on ${host}:${port}.`);
    } catch (error) {
      console.error(`\n=======================================================`);
      console.error(` ❌ MySQL Database Connection Error: ${error.message}`);
      console.error(` 💡 Host: ${host}:${port} | User: ${username} | DB: ${database}`);
      console.error(`=======================================================\n`);
      throw error;
    }
  } else {
    await sequelize.authenticate();
    console.log('[Database] Connected successfully to SQLite database.');
  }
  return sequelize;
}

module.exports = { sequelize, connectDB };
