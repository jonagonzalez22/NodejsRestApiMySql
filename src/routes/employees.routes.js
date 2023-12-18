import { Router } from 'express';
import {
	getEmployees,
	getEmployee,
	createEmployees,
	updateEmployees,
	deleteEmployees,
} from '../controllers/employees.controller.js';

const router = Router();

router.get('/employees', getEmployees);
router.get('/employee/:id', getEmployee);
router.post('/employees', createEmployees);
router.put('/employees/:id', updateEmployees);
router.delete('/employees/:id', deleteEmployees);

export default router;
