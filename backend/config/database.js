const { Sequelize } = require('sequelize');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

const dialect = process.env.DB_DIALECT || 'mysql';
const host = process.env.DB_HOST || 'localhost';
const port = process.env.DB_PORT || 3306;
const username = process.env.DB_USER || 'dev';
const password = process.env.DB_PASS || '';
const database = process.env.DB_NAME || 'globetotter';

let activeSequelize;

function getSequelizeInstance() {
  if (!activeSequelize) {
    if (dialect === 'mysql') {
      activeSequelize = new Sequelize(database, username, password, {
        host,
        port,
        dialect: 'mysql',
        logging: false,
        pool: { max: 10, min: 0, acquire: 5000, idle: 10000 },
        define: { timestamps: true, underscored: true }
      });
    } else {
      activeSequelize = new Sequelize({
        dialect: 'sqlite',
        storage: path.join(__dirname, '../database.sqlite'),
        logging: false,
        define: { timestamps: true, underscored: true }
      });
    }
  }
  return activeSequelize;
}

const sequelize = getSequelizeInstance();

async function connectDB() {
  try {
    await sequelize.authenticate();
    console.log(`[Database] Connected successfully to ${sequelize.getDialect()} database (${database}) on ${host}:${port}.`);
  } catch (error) {
    console.warn(`\n=======================================================`);
    console.warn(` ⚠️ MySQL Host (${host}:${port}) Connection Error (${error.code || error.message}).`);
    console.warn(` 💡 Ensure MySQL is running on ${host}:${port} or update DB_HOST in backend/.env.`);
    console.warn(`=======================================================\n`);
    throw error;
  }
  return sequelize;
}

module.exports = { sequelize, connectDB };
