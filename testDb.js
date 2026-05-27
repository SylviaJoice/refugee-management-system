const db = require('./config/db');

async function testConnection() {
  try {
    const result = await db.query('SELECT * FROM admin');
    console.log(result.rows);
  } catch (err) {
    console.error('Error:', err.message);
  }
}

testConnection();