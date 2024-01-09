import { Client } from 'pg';
require('dotenv').config()

const client = new Client({
  host: process.env.PGHOST || '',
  user: process.env.PGUSER || '',
  port: parseInt(process.env.PGPORT || '5432', 10),
  password: process.env.PGPASSWORD || '',
  database: process.env.PGDATABASE || '',
});

// const connectToDatabase = async (): Promise<void> => {
//   try {
//     await client.connect();
//     console.log('Connected to the database!');
//   } catch (error) {
//     console.error('Error connecting to the database:', error);
//   }
// };

const getClient = (): Client => client;

// export { connectToDatabase, getClient };
export { getClient };
