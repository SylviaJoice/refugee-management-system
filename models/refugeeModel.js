const pool = require('../config/db');

exports.getAll = async (search) => {
  let query = `SELECT r.*, s.shelter_name FROM refugees r LEFT JOIN shelters s ON r.shelter_id = s.shelter_id`;
  const params = [];
  if (search) {
    query += ' WHERE r.full_name ILIKE $1 OR r.nationality ILIKE $2';
    params.push(`%${search}%`, `%${search}%`);
  }
  query += ' ORDER BY r.created_at DESC';
  const result = await pool.query(query, params);
  return result.rows;
};

exports.findById = async (id) => {
  const result = await pool.query(
    `SELECT r.*, s.shelter_name FROM refugees r LEFT JOIN shelters s ON r.shelter_id = s.shelter_id WHERE refugee_id = $1`,
    [id]
  );
  return result.rows[0];
};

exports.create = async (data) => {
  const { full_name, gender, age, nationality, phone_number, refugee_status, shelter_id } = data;
  const result = await pool.query(
    `INSERT INTO refugees (full_name, gender, age, nationality, phone_number, refugee_status, shelter_id) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING refugee_id`,
    [full_name, gender, age, nationality, phone_number, refugee_status, shelter_id || null]
  );
  return result.rows[0].refugee_id;
};

exports.update = async (id, data) => {
  const { full_name, gender, age, nationality, phone_number, refugee_status, shelter_id } = data;
  await pool.query(
    `UPDATE refugees SET full_name = $1, gender = $2, age = $3, nationality = $4, phone_number = $5, refugee_status = $6, shelter_id = $7 WHERE refugee_id = $8`,
    [full_name, gender, age, nationality, phone_number, refugee_status, shelter_id || null, id]
  );
};

exports.delete = async (id) => {
  await pool.query('DELETE FROM refugees WHERE refugee_id = $1', [id]);
};

exports.countAll = async () => {
  const result = await pool.query('SELECT COUNT(*) AS count FROM refugees');
  return parseInt(result.rows[0].count);
};
