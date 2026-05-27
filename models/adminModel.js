const db = require('../config/db');

const findByUsername = async (username) => {
  const result = await db.query(
    'SELECT * FROM admin WHERE username = $1',
    [username]
  );

  return result.rows[0];
};

module.exports = {
  findByUsername
};