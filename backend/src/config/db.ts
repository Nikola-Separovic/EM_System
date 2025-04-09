import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

export const sequelize = new Sequelize({
  database: process.env.DB_DATABASE!,
  host: process.env.DB_HOST!,
  dialect: 'mssql',
  port: Number(process.env.DB_PORT!) || 1433,
  dialectOptions: {
    options: {
      encrypt: process.env.DB_ENCRYPT === 'true',
      trustServerCertificate: process.env.DB_TRUST_SERVER_CERT === 'true',
    },
  },
  username: process.env.DB_USER || undefined, // Allow empty username
  password: process.env.DB_PASSWORD || undefined, // Allow empty password
});

export const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ SQL Server Connected Successfully...');
  } catch (error) {
    console.error('❌ Database Connection Failed:', error);
  }
};
