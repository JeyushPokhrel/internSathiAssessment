import { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

import { getApplicationById, updateApplication } from '../services/api';
import ApplicationForm from '../components/ApplicationForm';

const EditApplication = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [initialData, setInitialData] = useState(null);

  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  // Fetch application on mount
  useEffect(() => {
    const fetchApplication = async () => {
      try {
        const data = await getApplicationById(id);

        if (data.success) {
          setInitialData(data.data);
        } else {
          setError(data.message || 'Failed to load application.');
        }
      } catch (err) {
        setError(
          err.response?.data?.message ||
            'Could not connect to the server.'
        );
      } finally {
        setLoading(false);
      }
    };

    fetchApplication();
  }, [id]);

  // Submit updated data
  const handleSubmit = async (formData) => {
    setIsSubmitting(true);
    setError(null);

    try {
      const data = await updateApplication(id, formData);

      if (data.success) {
        navigate('/');
      } else {
        setError(data.message || 'Failed to update application.');
      }
    } catch (err) {
      setError(
        err.response?.data?.message ||
          'Could not connect to the server.'
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
          <ArrowLeft className="w-4 h-4 mr-1" />
          Back to List
        </Link>
      </div>
 
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900">
          Edit Application
        </h2>
        <p className="mt-1 text-sm text-gray-500">
          Update the details of your application.
        </p>
      </div>

      {/* Error */}
      {error && (
        <div
          className="border-l-4 p-4 mb-6 rounded-r-lg"
          style={{
            backgroundColor: '#fef6f6',
            borderColor: '#ef2628',
          }}
        >
          <p className="text-sm font-medium text-[#ef2628]">
            {error}
          </p>
        </div>
      )}

      {/* Loading / Form / Empty */}
      {loading ? (
        <div className="flex justify-center items-center py-20">
          <div
            className="animate-spin h-12 w-12 border-b-2 rounded-full"
            style={{ borderColor: '#ef2628' }}
          />
        </div>
      ) : initialData ? (
        <ApplicationForm
          initialData={initialData}
          onSubmit={handleSubmit}
          isSubmitting={isSubmitting}
        />
      ) : (
        !error && (
          <p className="text-center text-gray-400 py-10">
            Application not found.
          </p>
        )
      )}
    </div>
  );
};

export default EditApplication;