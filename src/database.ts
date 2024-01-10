require('dotenv').config();

const knex = require('knex')({
  client: 'pg',
  connection: {
    host: process.env.PGHOST || '',
    user: process.env.PGUSER || '',
    port: parseInt(process.env.PGPORT || '5432', 10),
    password: process.env.PGPASSWORD || '',
    database: process.env.PGDATABASE || '',
  },
});

async function testConnection() {
  try {
    const result = await knex.raw('SELECT CURRENT_TIMESTAMP as currentTime');
    console.log('Connection successful!');
    console.log('Current timestamp from the database:', result.rows[0].currenttime);
  } catch (error) {
    console.error('Error connecting to the database:', error);
  } finally {
    await knex.destroy();
  }
}

export default knex;
