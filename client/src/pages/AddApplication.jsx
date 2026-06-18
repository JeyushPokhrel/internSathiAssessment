import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

import { createApplication } from '../services/api';
import ApplicationForm from '../components/ApplicationForm';

const AddApplication = () => {
  const navigate = useNavigate();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (formData) => {
    setIsSubmitting(true);
    setError(null);

    try {
      const data = await createApplication(formData);

      if (data.success) {
        navigate('/');
      } else {
        setError(data.message || 'Failed to add application.');
      }
    } catch (err) {
      setError(
        err.response?.data?.message || 'Could not connect to the server.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
 
      <div className="mb-6">
        <Link
          to="/"
          className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to List
        </Link>
      </div>
 
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900">
          Add New Application
        </h2>
        <p className="mt-1 text-sm text-gray-500">
          Fill in the details of a job you applied for.
        </p>
      </div>
 
      {error && (
        <div
          className="border-l-4 p-4 mb-6 rounded-r-lg"
          style={{ backgroundColor: '#fef6f6', borderColor: '#ef2628' }}
        >
          <p className="text-sm font-medium text-[#ef2628]">{error}</p>
        </div>
      )}
 
      <ApplicationForm
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
      />
    </div>
  );
};

export default AddApplication;