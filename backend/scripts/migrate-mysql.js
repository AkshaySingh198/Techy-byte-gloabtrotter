const mysql = require('mysql2/promise');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

async function inspectAllTables() {
  const host = process.env.DB_HOST || 'localhost';
  const port = process.env.DB_PORT || 3306;
  const user = process.env.DB_USER || 'dev';
  const password = process.env.DB_PASS || '';
  const database = process.env.DB_NAME || 'globetotter';

  try {
    const conn = await mysql.createConnection({ host, port, user, password, database });
    const [tables] = await conn.query(`SHOW TABLES;`);
    const tableKey = Object.keys(tables[0])[0];
    const tableNames = tables.map(t => t[tableKey]);

    console.log('--- ALL TABLES IN TEAM MYSQL DATABASE ---');
    console.log(tableNames);

    for (const tableName of tableNames) {
      const [cols] = await conn.query(`SHOW COLUMNS FROM \`${tableName}\`;`);
      console.log(`\nTable [${tableName}]:`, cols.map(c => `${c.Field} (${c.Type}, Key: ${c.Key})`));
    }

    await conn.end();
  } catch (err) {
    console.error('Inspect error:', err.message);
  }
}

inspectAllTables();
