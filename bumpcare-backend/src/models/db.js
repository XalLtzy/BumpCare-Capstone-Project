const { Pool } = require('pg');
require('dotenv').config();

const requiredEnv = ['DB_HOST', 'DB_PORT', 'DB_USER', 'DB_PASS', 'DB_NAME'];
requiredEnv.forEach((envVar) => {
  if (!process.env[envVar]) {
    console.warn(`⚠️ Warning: Environment variable ${envVar} is not set`);
  }
});

const pool = new Pool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT) || 5432,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : false,
});

pool.connect()
  .then(() => console.log('✅ Connected to PostgreSQL'))
  .catch((err) => console.error('❌ Connection error:', err.stack));

module.exports = {
  query: (text, params) => pool.query(text, params),
};
