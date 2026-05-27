const pool = require('../config/db');

exports.getAll = async () => {
  const result = await pool.query(
    'SELECT a.*, r.full_name FROM aid_distribution a JOIN refugees r ON a.refugee_id = r.refugee_id ORDER BY distribution_date DESC'
  );
  return result.rows;
};

exports.findById = async (id) => {
  const result = await pool.query('SELECT * FROM aid_distribution WHERE aid_id = $1', [id]);
  return result.rows[0];
};

exports.create = async (data) => {
  const { refugee_id, aid_type, distribution_date, quantity, distributed_by } = data;
  const result = await pool.query(
    'INSERT INTO aid_distribution (refugee_id, aid_type, distribution_date, quantity, distributed_by) VALUES ($1, $2, $3, $4, $5) RETURNING aid_id',
    [refugee_id, aid_type, distribution_date, quantity, distributed_by]
  );
  return result.rows[0].aid_id;
};

exports.update = async (id, data) => {
  const { refugee_id, aid_type, distribution_date, quantity, distributed_by } = data;
  await pool.query(
    'UPDATE aid_distribution SET refugee_id = $1, aid_type = $2, distribution_date = $3, quantity = $4, distributed_by = $5 WHERE aid_id = $6',
    [refugee_id, aid_type, distribution_date, quantity, distributed_by, id]
  );
};

exports.delete = async (id) => {
  await pool.query('DELETE FROM aid_distribution WHERE aid_id = $1', [id]);
};

exports.countAll = async () => {
  const result = await pool.query('SELECT COUNT(*) AS count FROM aid_distribution');
  return parseInt(result.rows[0].count);
};
