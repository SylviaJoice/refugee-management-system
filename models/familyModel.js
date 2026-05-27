const pool = require('../config/db');

exports.getByRefugeeId = async (refugee_id) => {
  const result = await pool.query('SELECT * FROM family_members WHERE refugee_id = $1 ORDER BY member_name', [refugee_id]);
  return result.rows;
};

exports.getAll = async () => {
  const result = await pool.query('SELECT fm.*, r.full_name FROM family_members fm JOIN refugees r ON fm.refugee_id = r.refugee_id ORDER BY r.full_name');
  return result.rows;
};

exports.findById = async (id) => {
  const result = await pool.query('SELECT * FROM family_members WHERE member_id = $1', [id]);
  return result.rows[0];
};

exports.create = async (data) => {
  const { refugee_id, member_name, relationship, age, gender } = data;
  const result = await pool.query(
    'INSERT INTO family_members (refugee_id, member_name, relationship, age, gender) VALUES ($1, $2, $3, $4, $5) RETURNING member_id',
    [refugee_id, member_name, relationship, age, gender]
  );
  return result.rows[0].member_id;
};

exports.update = async (id, data) => {
  const { refugee_id, member_name, relationship, age, gender } = data;
  await pool.query(
    'UPDATE family_members SET refugee_id = $1, member_name = $2, relationship = $3, age = $4, gender = $5 WHERE member_id = $6',
    [refugee_id, member_name, relationship, age, gender, id]
  );
};

exports.delete = async (id) => {
  await pool.query('DELETE FROM family_members WHERE member_id = $1', [id]);
};

exports.countAll = async () => {
  const result = await pool.query('SELECT COUNT(*) as count FROM family_members');
  return parseInt(result.rows[0].count);
};
