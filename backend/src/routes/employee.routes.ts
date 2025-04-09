import * as express from 'express';
import { getAllEmployees, getEmployeeById, createEmployee, updateEmployee, deleteEmployee } from '../controllers/employee.controller';
import { upload } from '../middlewares/upload';

const router = express.Router();

router.get('/employees', getAllEmployees);
router.get('/employees/:id', getEmployeeById);
router.post('/employees', upload.single('picture'), createEmployee);
router.put('/employees/:id', upload.single('picture'), updateEmployee);
router.delete('/employees/:id', deleteEmployee);

export default router;
