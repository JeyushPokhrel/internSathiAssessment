import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Reusable form for both create and edit flows
const ApplicationForm = ({ initialData, onSubmit, isSubmitting }) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    company_name: '',
    job_title: '',
    job_type: 'FullTime',
    status: 'Applied',
    applied_date: new Date().toISOString().split('T')[0],
    notes: '',
  });

  const [errors, setErrors] = useState({});

  // Populate form when editing
  useEffect(() => {
    if (initialData) {
      setFormData({
        ...initialData,
        applied_date: new Date(initialData.applied_date)
          .toISOString()
          .split('T')[0],
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear field error on change
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.company_name || formData.company_name.length < 2) {
      newErrors.company_name = 'Company name must be at least 2 characters.';
    }
    if (!formData.job_title) {
      newErrors.job_title = 'Job title is required.';
    }
    if (!formData.applied_date) {
      newErrors.applied_date = 'Applied date is required.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) onSubmit(formData);
  };

  const inputClass = (field) =>
    `w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2
    ${
      errors[field]
        ? 'border-red-400 focus:ring-red-300'
        : 'border-gray-200 focus:ring-[#f37e7e]'
    }`;

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-sm rounded-xl p-6 max-w-2xl mx-auto space-y-6 border border-gray-100"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* Company Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Company Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="company_name"
            value={formData.company_name}
            onChange={handleChange}
            placeholder="e.g. Google"
            className={inputClass('company_name')}
          />
          {errors.company_name && (
            <p className="mt-1 text-xs text-red-500">{errors.company_name}</p>
          )}
        </div>

        {/* Job Title */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Job Title <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="job_title"
            value={formData.job_title}
            onChange={handleChange}
            placeholder="e.g. Frontend Developer Intern"
            className={inputClass('job_title')}
          />
          {errors.job_title && (
            <p className="mt-1 text-xs text-red-500">{errors.job_title}</p>
          )}
        </div>

        {/* Job Type */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Job Type
          </label>
          <select
            name="job_type"
            value={formData.job_type}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#f37e7e]"
          >
            <option value="Internship">Internship</option>
            <option value="FullTime">Full-time</option>
            <option value="PartTime">Part-time</option>
          </select>
        </div>

        {/* Status */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Status
          </label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#f37e7e]"
          >
            <option value="Applied">Applied</option>
            <option value="Interviewing">Interviewing</option>
            <option value="Offer">Offer</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>

        {/* Applied Date */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Applied Date <span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            name="applied_date"
            value={formData.applied_date}
            onChange={handleChange}
            className={inputClass('applied_date')}
          />
          {errors.applied_date && (
            <p className="mt-1 text-xs text-red-500">{errors.applied_date}</p>
          )}
        </div>
      </div>

      {/* Notes */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Notes <span className="text-gray-400 font-normal">(optional)</span>
        </label>
        <textarea
          name="notes"
          value={formData.notes || ''}
          onChange={handleChange}
          rows="4"
          placeholder="Any extra notes..."
          className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm resize-none focus:outline-none focus:ring-2 focus:ring-[#f37e7e]"
        />
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
        <button
          type="button"
          onClick={() => navigate('/')}
          className="px-5 py-2 text-sm text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50"
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={isSubmitting}
          className="px-5 py-2 text-sm text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
          style={{ backgroundColor: '#ef2628' }}
        >
          {isSubmitting
            ? 'Saving...'
            : initialData
            ? 'Update Application'
            : 'Add Application'}
        </button>
      </div>
    </form>
  );
};

export default ApplicationForm;