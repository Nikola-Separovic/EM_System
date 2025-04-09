import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

//Get all employees
export const getEmployees = () => 
  axios.get(`${API_URL}/employees`).then(res => res.data);

//Get employee by ID
export const getEmployeeById = (id: number) => 
  axios.get(`${API_URL}/employees/${id}`).then(res => res.data);

// Create Employee
export const createEmployee = async (employeeData: FormData) => {
  const response = await axios.post(`${API_URL}/employees`, employeeData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

// Update an employee
export const updateEmployee = async (id: number, employeeData: FormData) => {
  const response = await axios.put(`${API_URL}/employees/${id}`, employeeData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

// Delete Employee
export const deleteEmployee = (id: number) =>
  axios.delete(`${API_URL}/employees/${id}`).then(res => res.data);