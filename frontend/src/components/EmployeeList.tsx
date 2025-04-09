import { useEffect, useState, useMemo } from 'react';
import { getEmployees } from '../api/employee.api';
import { useNavigate } from 'react-router-dom';
import {  UserIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';

interface Employee {
  id: number;
  name: string;
  surname: string;
  department: string;
  picture?: string;
}

const EmployeeList = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  let filterDepartment = '';
  const showFilters = false;

  useEffect(() => {
    getEmployees()
      .then(setEmployees)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const filteredEmployees = useMemo(() => {
    return employees.filter(employee => {
      const matchesSearch = (
        employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employee.surname.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employee.department.toLowerCase().includes(searchTerm.toLowerCase())
      );
      const matchesDepartment = !filterDepartment || employee.department === filterDepartment;
      return matchesSearch && matchesDepartment;
    });
  }, [employees, searchTerm, filterDepartment]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-0">
          Employee Management
        </h1>
        <div className="flex items-center gap-4">
          <input
            type="text"
            placeholder="Search employees..."
            className="w-64 px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 
                    focus:outline-none focus:ring-2 focus:ring-primary-500 
                    dark:text-white dark:placeholder-gray-400"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {showFilters && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-md"
        >
          {/* Filter controls */}
        </motion.div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEmployees.map((employee) => (
          <motion.div
            key={employee.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.02 }}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-md 
              hover:shadow-lg transition-all duration-200 cursor-pointer
              dark:border-gray-700 overflow-hidden"
            onClick={() => navigate(`/employees/${employee.id}`)}
          >
            <div className="p-6">
              <div className="flex items-center gap-4">
                {employee.picture ? (
                  <img
                    src={`http://localhost:5000${employee.picture}`}
                    alt={employee.name}
                    className="h-16 w-16 rounded-full object-cover"
                  />
                ) : (
                  <div className="h-16 w-16 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                    <UserIcon className="h-8 w-8 text-gray-400 dark:text-gray-300" />
                  </div>
                )}
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                    {employee.name} {employee.surname}
                  </h2>
                  <p className="text-sm text-gray-600 dark:text-gray-300">{employee.department}</p>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default EmployeeList;
