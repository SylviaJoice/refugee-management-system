const pool = require('../config/db');

exports.getAll = async () => {
  const result = await pool.query(
    'SELECT m.*, r.full_name FROM medical_records m JOIN refugees r ON m.refugee_id = r.refugee_id ORDER BY visit_date DESC'
  );
  return result.rows;
};

exports.findById = async (id) => {
  const result = await pool.query('SELECT * FROM medical_records WHERE record_id = $1', [id]);
  return result.rows[0];
};

exports.create = async (data) => {
  const { refugee_id, illness, treatment, doctor_name, visit_date } = data;
  const result = await pool.query(
    'INSERT INTO medical_records (refugee_id, illness, treatment, doctor_name, visit_date) VALUES ($1, $2, $3, $4, $5) RETURNING record_id',
    [refugee_id, illness, treatment, doctor_name, visit_date]
  );
  return result.rows[0].record_id;
};

exports.update = async (id, data) => {
  const { refugee_id, illness, treatment, doctor_name, visit_date } = data;
  await pool.query(
    'UPDATE medical_records SET refugee_id = $1, illness = $2, treatment = $3, doctor_name = $4, visit_date = $5 WHERE record_id = $6',
    [refugee_id, illness, treatment, doctor_name, visit_date, id]
  );
};

exports.delete = async (id) => {
  await pool.query('DELETE FROM medical_records WHERE record_id = $1', [id]);
};

exports.countAll = async () => {
  const result = await pool.query('SELECT COUNT(*) AS count FROM medical_records');
  return parseInt(result.rows[0].count);
};
