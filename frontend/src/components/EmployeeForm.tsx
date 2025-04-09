import { useState, useEffect } from 'react';
import React from 'react';
import { createEmployee, updateEmployee, getEmployeeById } from '../api/employee.api';
import { useNavigate, useParams } from 'react-router-dom';
import { UserIcon, PhotoIcon } from '@heroicons/react/24/outline';

interface Employee {
  id?: number;
  name: string;
  surname: string;
  picture: string;
  sex: string;
  yearOfBirth: number;
  dateOfWork: string;
  typeOfContract: 'specific' | 'indefinite';
  durationOfContract: string;
  department: string;
  vacationDays: number;
  freeDays: number;
  paidVacationDays: number;
}

const EmployeeForm = () => {
  const { id } = useParams<{ id?: string }>();
  const navigate = useNavigate();
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');

  const [employee, setEmployee] = useState<Employee>({
    name: '',
    surname: '',
    picture: '',
    sex: '',
    yearOfBirth: new Date().getFullYear(),
    dateOfWork: '',
    typeOfContract: 'specific',
    durationOfContract: '',
    department: '',
    vacationDays: 0,
    freeDays: 0,
    paidVacationDays: 0,
  });

  useEffect(() => {
    if (id) {
      getEmployeeById(Number(id)).then(data => {
        setEmployee(data);
        if (data.picture) {
          setImagePreview(`http://localhost:5000${data.picture}`);
        }
      });
    } else {
      setEmployee({
        name: '',
        surname: '',
        picture: '',
        sex: '',
        yearOfBirth: new Date().getFullYear(),
        dateOfWork: '',
        typeOfContract: 'specific',
        durationOfContract: '',
        department: '',
        vacationDays: 0,
        freeDays: 0,
        paidVacationDays: 0,
      });
    }
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setEmployee(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    
    Object.entries(employee).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        formData.append(key, value.toString());
      }
    });
    
    if (imageFile) {
      formData.append('picture', imageFile);
    }

    try {
      if (id) {
        await updateEmployee(Number(id), formData);
      } else {
        await createEmployee(formData);
      }
      navigate('/');
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-white shadow-lg rounded-lg p-6 md:p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          {id ? 'Edit Employee' : 'Add New Employee'}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex flex-col items-center mb-6">
            <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-100 mb-4">
              {imagePreview ? (
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <UserIcon className="w-16 h-16 text-gray-400" />
                </div>
              )}
            </div>
            <label className="cursor-pointer bg-gray-50 hover:bg-gray-100 text-gray-600 px-4 py-2 rounded-md flex items-center gap-2 transition-colors">
              <PhotoIcon className="w-5 h-5" />
              Choose Photo
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </label>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                name="name"
                value={employee.name}
                onChange={handleChange}
                className="input-field"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Surname</label>
              <input
                type="text"
                name="surname"
                value={employee.surname}
                onChange={handleChange}
                className="input-field"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Gender</label>
              <select
                name="sex"
                value={employee.sex}
                onChange={handleChange}
                className="input-field"
                required
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Year of Birth</label>
              <input
                type="number"
                name="yearOfBirth"
                value={employee.yearOfBirth}
                onChange={handleChange}
                className="input-field"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Department</label>
              <input
                type="text"
                name="department"
                value={employee.department}
                onChange={handleChange}
                className="input-field"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Date of Work</label>
              <input
                type="date"
                name="dateOfWork"
                value={employee.dateOfWork}
                onChange={handleChange}
                className="input-field"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Type of Contract</label>
              <select
                name="typeOfContract"
                value={employee.typeOfContract}
                onChange={handleChange}
                className="input-field"
                required
              >
                <option value="specific">Specific</option>
                <option value="indefinite">Indefinite</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Duration of Contract</label>
              <input
                type="text"
                name="durationOfContract"
                value={employee.durationOfContract}
                onChange={handleChange}
                className="input-field"
                placeholder="e.g., 12 months"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Vacation Days</label>
              <input
                type="number"
                name="vacationDays"
                value={employee.vacationDays}
                onChange={handleChange}
                className="input-field"
                min="0"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Free Days</label>
              <input
                type="number"
                name="freeDays"
                value={employee.freeDays}
                onChange={handleChange}
                className="input-field"
                min="0"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Paid Vacation Days</label>
              <input
                type="number"
                name="paidVacationDays"
                value={employee.paidVacationDays}
                onChange={handleChange}
                className="input-field"
                min="0"
                required
              />
            </div>
          </div>

          <div className="flex justify-end space-x-4 pt-6">
            <button
              type="button"
              onClick={() => navigate('/')}
              className="flex items-center justify-center gap-2 bg-gray-700 text-white px-6 py-2 rounded-lg hover:bg-gray-900 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn-primary"
            >
              {id ? 'Update Employee' : 'Create Employee'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EmployeeForm;
