import { pool } from '../db.js';

export const getEmployees = async (req, res) => {
	try {
		const [rows] = await pool.query('SELECT * FROM employee');
		res.send(rows);
	} catch (error) {
		return res.status(500).json({ message: 'Something goes wrong' });
	}
};

export const getEmployee = async (req, res) => {
	const [rows] = await pool.query(
		'SELECT * FROM employee WHERE idEmployee = ?',
		[req.params.id]
	);

	rows.length <= 0
		? res.status(404).json({ message: 'Employee not found' })
		: res.send(rows[0]);
};

export const createEmployees = async (req, res) => {
	const { name, salary } = req.body;
	const [rows] = await pool.query(
		'INSERT INTO employee(nombre, salary) VALUES(?, ?)',
		[name, salary]
	);
	res.send({ id: rows.insertId, name, salary });
};

export const updateEmployees = async (req, res) => {
	const { id } = req.params;
	const { name, salary } = req.body;
	const [rows] = await pool.query(
		'UPDATE employee SET nombre = ?, salary = ? WHERE idEmployee = ?',
		[name, salary, id]
	);
	rows.affectedRows <= 0
		? res.status(404).json({ message: 'Employee not found' })
		: res.sendStatus(204);
};

export const deleteEmployees = async (req, res) => {
	const { id } = req.params;
	const [rows] = await pool.query('DELETE FROM employee WHERE idEmployee = ?', [
		id,
	]);
	rows.affectedRows <= 0
		? res.status(404).json({ message: 'Employee not found' })
		: res.sendStatus(204);
};
