import express from 'express';
import cors from 'cors';
import path from 'path';
import * as dotenv from 'dotenv';
import { connectDB } from './config/db';
import employeeRoutes from './routes/employee.routes';

dotenv.config();

const app = express();

// Configure CORS
app.use(cors());

// Configure body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from uploads directory
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

app.use('/api', employeeRoutes);

connectDB();

export default app;
