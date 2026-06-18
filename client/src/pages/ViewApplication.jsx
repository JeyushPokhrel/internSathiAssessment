import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Edit } from 'lucide-react';

import { getApplicationById } from '../services/api';

const ViewApplication = () => {
  const { id } = useParams();

  const [application, setApplication] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch application
  useEffect(() => {
    const fetchApplication = async () => {
      try {
        const data = await getApplicationById(id);

        if (data.success) {
          setApplication(data.data);
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

  // Status badge styles
  const getStatusBadge = (status) => {
    const map = {
      Applied: {
        bg: '#fef6f6',
        color: '#ef2628',
        border: '#f37e7e',
      },
      Interviewing: {
        bg: '#fff7ed',
        color: '#c2410c',
        border: '#fdba74',
      },
      Offer: {
        bg: '#f0fdf4',
        color: '#15803d',
        border: '#86efac',
      },
      Rejected: {
        bg: '#f1f5f9',
        color: '#475569',
        border: '#cbd5e1',
      },
    };

    return map[status] || {
      bg: '#f3f4f6',
      color: '#374151',
      border: '#d1d5db',
    };
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div
          className="animate-spin h-12 w-12 border-b-2 rounded-full"
          style={{ borderColor: '#ef2628' }}
        />
      </div>
    );
  }

  if (error || !application) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-8 text-center">
        <p className="mb-4 text-[#ef2628]">
          {error || 'Application not found.'}
        </p>
        <Link to="/" className="text-sm underline text-[#ef2628]">
          Return to Dashboard
        </Link>
      </div>
    );
  }

  const badge = getStatusBadge(application.status);

  // Reusable detail row
  const DetailRow = ({ label, value }) => (
    <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 border-b border-gray-100 last:border-0">
      <dt className="text-sm font-medium text-gray-500">{label}</dt>
      <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
        {value}
      </dd>
    </div>
  );

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

      {/* Header */}
      <div className="mb-6 flex items-center justify-between">

        <Link
          to="/"
          className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700"
        >
          <ArrowLeft className="w-4 h-4 mr-1" />
          Back to List
        </Link>

        <Link
          to={`/edit/${application.id}`}
          className="inline-flex items-center px-4 py-2 text-sm font-medium rounded-lg border"
          style={{
            borderColor: '#ef2628',
            color: '#ef2628',
          }}
        >
          <Edit className="w-4 h-4 mr-2" />
          Edit
        </Link>

      </div>

      {/* Card */}
      <div className="bg-white shadow-sm rounded-xl overflow-hidden border border-gray-100">

        {/* Header */}
        <div
          className="px-6 py-5 border-b border-gray-100 flex justify-between items-start"
          style={{ backgroundColor: '#fef6f6' }}
        >
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              {application.company_name}
            </h3>
            <p className="text-sm text-gray-500 mt-0.5">
              {application.job_title}
            </p>
          </div>

          <span
            className="px-3 py-1 text-xs font-semibold rounded-full border"
            style={{
              backgroundColor: badge.bg,
              color: badge.color,
              borderColor: badge.border,
            }}
          >
            {application.status}
          </span>
        </div>

        {/* Details */}
        <dl>
          <DetailRow label="Job Type" value={application.job_type} />

          <DetailRow
            label="Applied Date"
            value={new Date(application.applied_date).toLocaleDateString(
              undefined,
              {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              }
            )}
          />

          <DetailRow
            label="Notes"
            value={application.notes || 'No notes provided.'}
          />
        </dl>

      </div>
    </div>
  );
};

export default ViewApplication;