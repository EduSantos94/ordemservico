import { Client } from 'pg';
require('dotenv').config()

const client = new Client({
  host: process.env.PGHOST || '',
  user: process.env.PGUSER || '',
  port: parseInt(process.env.PGPORT || '5432', 10),
  password: process.env.PGPASSWORD || '',
  database: process.env.PGDATABASE || '',
});

const getClient = (): Client => client;

export { getClient };
