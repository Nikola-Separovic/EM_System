import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/db';

class Employee extends Model {}

Employee.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false },
    surname: { type: DataTypes.STRING, allowNull: false },
    picture: { type: DataTypes.STRING, allowNull: true },
    sex: { type: DataTypes.STRING, allowNull: false },
    yearOfBirth: { type: DataTypes.INTEGER, allowNull: false },
    dateOfWork: { type: DataTypes.DATE, allowNull: false },
    typeOfContract: { type: DataTypes.STRING, allowNull: false },
    durationOfContract: { type: DataTypes.STRING, allowNull: true },
    department: { type: DataTypes.STRING, allowNull: false },
    vacationDays: { type: DataTypes.INTEGER, allowNull: true, defaultValue: 0 },
    freeDays: { type: DataTypes.INTEGER, allowNull: true, defaultValue: 0 },
    paidVacationDays: { type: DataTypes.INTEGER, allowNull: true, defaultValue: 0 },
  },
  { sequelize, modelName: 'Employee', tableName: 'employees', timestamps: false }
);

export default Employee;
