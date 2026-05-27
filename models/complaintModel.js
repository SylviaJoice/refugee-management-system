const pool = require('../config/db');

exports.getAll = async () => {
  const result = await pool.query(
    'SELECT c.*, r.full_name FROM complaints c JOIN refugees r ON c.refugee_id = r.refugee_id ORDER BY c.created_at DESC'
  );
  return result.rows;
};

exports.findById = async (id) => {
  const result = await pool.query('SELECT * FROM complaints WHERE complaint_id = $1', [id]);
  return result.rows[0];
};

exports.create = async (data) => {
  const { refugee_id, complaint_title, complaint_description, complaint_status } = data;
  const result = await pool.query(
    'INSERT INTO complaints (refugee_id, complaint_title, complaint_description, complaint_status) VALUES ($1, $2, $3, $4) RETURNING complaint_id',
    [refugee_id, complaint_title, complaint_description, complaint_status || 'Pending']
  );
  return result.rows[0].complaint_id;
};

exports.update = async (id, data) => {
  const { refugee_id, complaint_title, complaint_description, complaint_status } = data;
  await pool.query(
    'UPDATE complaints SET refugee_id = $1, complaint_title = $2, complaint_description = $3, complaint_status = $4 WHERE complaint_id = $5',
    [refugee_id, complaint_title, complaint_description, complaint_status, id]
  );
};

exports.delete = async (id) => {
  await pool.query('DELETE FROM complaints WHERE complaint_id = $1', [id]);
};

exports.countAll = async () => {
  const result = await pool.query('SELECT COUNT(*) AS count FROM complaints');
  return parseInt(result.rows[0].count);
};
