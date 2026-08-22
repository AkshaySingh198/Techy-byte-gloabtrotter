const { Sequelize } = require('sequelize');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

const dialect = process.env.DB_DIALECT || 'mysql';
const host = process.env.DB_HOST || 'localhost';
const port = process.env.DB_PORT || 3306;
const username = process.env.DB_USER || 'dev';
const password = process.env.DB_PASS || '';
const database = process.env.DB_NAME || 'globetotter';

function createSqliteInstance() {
  return new Sequelize({
    dialect: 'sqlite',
    storage: path.join(__dirname, '../database.sqlite'),
    logging: false,
    define: { timestamps: true, underscored: true }
  });
}

function createMysqlInstance() {
  return new Sequelize(database, username, password, {
    host,
    port,
    dialect: 'mysql',
    logging: false,
    pool: { max: 10, min: 0, acquire: 5000, idle: 10000 },
    define: { timestamps: true, underscored: true }
  });
}

let activeSequelize = dialect === 'mysql' ? createMysqlInstance() : createSqliteInstance();

const sequelizeProxy = new Proxy({}, {
  get(target, prop) {
    return activeSequelize[prop];
  }
});

async function connectDB() {
  if (dialect === 'mysql') {
    try {
      await activeSequelize.authenticate();
      console.log(`[Database] Connected successfully to mysql database (${database}) on ${host}:${port}.`);
    } catch (error) {
      console.warn(`\n=======================================================`);
      console.warn(` ⚠️ MySQL Host (${host}:${port}) Connection Error (${error.code || error.message}).`);
      console.warn(` 💡 Falling back to SQLite database for development/testing.`);
      console.warn(`=======================================================\n`);
      activeSequelize = createSqliteInstance();
      await activeSequelize.authenticate();
      console.log(`[Database] Connected successfully to sqlite fallback database.`);
    }
  } else {
    await activeSequelize.authenticate();
    console.log(`[Database] Connected successfully to sqlite database.`);
  }
  return activeSequelize;
}

module.exports = { sequelize: sequelizeProxy, connectDB };

