import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getEmployeeById, deleteEmployee } from '../api/employee.api';
import { PencilIcon, TrashIcon, BriefcaseIcon, CalendarIcon, UserIcon } from '@heroicons/react/24/outline';

interface Employee {
  id: number;
  name: string;
  surname: string;
  picture: string;
  department: string;
  typeOfContract: string;
  yearOfBirth: number;
  dateOfWork: string;
}

const EmployeeDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [employee, setEmployee] = useState<Employee | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!id) return;
    getEmployeeById(Number(id))
      .then(setEmployee)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [id]);

  const handleDelete = async () => {
    if (!id) return;
    await deleteEmployee(Number(id));
    navigate('/');
  };

  const handleEdit = () => {
    navigate(`/employees/edit/${id}`);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (!employee) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-xl text-gray-600">No Employee Found</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        {employee.picture ? (
          <div className="aspect-w-16 aspect-h-9 bg-gray-100">
            <img
              src={`http://localhost:5000${employee.picture}`}
              alt={`${employee.name} ${employee.surname}`}
              className="object-cover w-full h-60.5"
            />
          </div>
        ) : (
          <div className="h-64 bg-gray-100 flex items-center justify-center">
            <UserIcon className="h-24 w-24 text-gray-400" />
          </div>
        )}
        
        <div className="p-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            {employee.name} {employee.surname}
          </h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="flex items-center gap-3">
              <BriefcaseIcon className="h-5 w-5 text-gray-500" />
              <div>
                <p className="text-sm text-gray-600">Department</p>
                <p className="text-lg font-medium text-gray-900 dark:text-black">{employee.department}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <CalendarIcon className="h-5 w-5 text-gray-500" />
              <div>
                <p className="text-sm text-gray-600">Contract Type</p>
                <p className="text-lg font-medium text-gray-900 dark:text-black">{employee.typeOfContract}</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={handleEdit}
              className="flex items-center justify-center gap-2 bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition-colors"
            >
              <PencilIcon className="h-5 w-5" />
              Edit Employee
            </button>
            <button
              onClick={handleDelete}
              className="flex items-center justify-center gap-2 bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors"
            >
              <TrashIcon className="h-5 w-5" />
              Delete Employee
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDetails;
