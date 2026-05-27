const pool = require('../config/db');

exports.getAll = async () => {
  const result = await pool.query('SELECT * FROM shelters ORDER BY shelter_name');
  return result.rows;
};

exports.findById = async (id) => {
  const result = await pool.query('SELECT * FROM shelters WHERE shelter_id = $1', [id]);
  return result.rows[0];
};

exports.create = async (data) => {
  const { shelter_name, location, capacity, available_slots } = data;
  const result = await pool.query(
    'INSERT INTO shelters (shelter_name, location, capacity, available_slots) VALUES ($1, $2, $3, $4) RETURNING shelter_id',
    [shelter_name, location, capacity, available_slots]
  );
  return result.rows[0].shelter_id;
};

exports.update = async (id, data) => {
  const { shelter_name, location, capacity, available_slots } = data;
  await pool.query(
    'UPDATE shelters SET shelter_name = $1, location = $2, capacity = $3, available_slots = $4 WHERE shelter_id = $5',
    [shelter_name, location, capacity, available_slots, id]
  );
};

exports.delete = async (id) => {
  await pool.query('DELETE FROM shelters WHERE shelter_id = $1', [id]);
};

exports.countAll = async () => {
  const result = await pool.query('SELECT COUNT(*) AS count FROM shelters');
  return parseInt(result.rows[0].count);
};
