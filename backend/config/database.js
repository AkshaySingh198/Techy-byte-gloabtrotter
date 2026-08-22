const { Sequelize } = require('sequelize');
const path = require('path');
require('dotenv').config();

const dialect = process.env.DB_DIALECT || 'sqlite';
const host = process.env.DB_HOST || 'localhost';
const port = process.env.DB_PORT || 3306;
const username = process.env.DB_USER || 'root';
const password = process.env.DB_PASS || '';
const database = process.env.DB_NAME || 'globetrotter_db';

let sequelize;

if (dialect === 'mysql' && process.env.DB_USER && process.env.DB_PASS) {
  sequelize = new Sequelize(database, username, password, {
    host,
    port,
    dialect: 'mysql',
    logging: false,
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
  try {
    await sequelize.authenticate();
    console.log(`[Database] Connected successfully to ${sequelize.getDialect()} database.`);
  } catch (error) {
    console.warn(`[Database] DB connection error: ${error.message}. Switching to SQLite fallback.`);
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: path.join(__dirname, '../database.sqlite'),
      logging: false,
      define: { timestamps: true, underscored: true }
    });
    await sequelize.authenticate();
    console.log('[Database] Connected successfully to fallback SQLite database.');
  }
  return sequelize;
}

module.exports = { sequelize, connectDB };
