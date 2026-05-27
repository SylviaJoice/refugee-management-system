const fs = require('fs');
const path = require('path');
const db = require('./config/db');

async function initializeDatabase() {
  try {
    // Read the schema.sql file
    const schemaPath = path.join(__dirname, 'database', 'schema.sql');
    const schema = fs.readFileSync(schemaPath, 'utf8');

    // Split by semicolon and filter empty statements
    const statements = schema
      .split(';')
      .map(stmt => stmt.trim())
      .filter(stmt => stmt.length > 0);

    console.log(`Executing ${statements.length} SQL statements...`);

    // Execute each statement
    for (let i = 0; i < statements.length; i++) {
      try {
        await db.query(statements[i]);
        console.log(`✓ Statement ${i + 1} executed successfully`);
      } catch (err) {
        console.error(`✗ Error on statement ${i + 1}:`, err.message);
      }
    }

    console.log('\n✓ Database initialization complete!');
    process.exit(0);
  } catch (err) {
    console.error('Error reading schema file:', err.message);
    process.exit(1);
  }
}

initializeDatabase();
