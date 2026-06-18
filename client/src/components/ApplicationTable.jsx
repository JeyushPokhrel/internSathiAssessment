import { Eye, Edit, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const getStatusBadge = (status) => {
  const styles = {
    Applied: 'background:#fef6f6;color:#ef2628;border:1px solid #f37e7e;',
    Interviewing: 'background:#fff7ed;color:#c2410c;border:1px solid #fdba74;',
    Offer: 'background:#f0fdf4;color:#15803d;border:1px solid #86efac;',
    Rejected: 'background:#f1f5f9;color:#475569;border:1px solid #cbd5e1;',
  };
  return styles[status] || '';
};

const ApplicationTable = ({ applications, onDeleteClick }) => {
  if (!applications.length) {
    return (
      <div className="text-center py-16 bg-white rounded-xl shadow-sm border border-gray-100">
        <p className="text-gray-400 text-lg">No applications found.</p>
        <p className="text-gray-400 text-sm mt-1">
          Add your first application to get started.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white shadow-sm rounded-xl overflow-hidden border border-gray-100">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-100">

          {/* Header */}
          <thead>
            <tr style={{ backgroundColor: '#fef6f6' }}>
              {['Company', 'Job Title', 'Type', 'Status', 'Applied Date', 'Actions'].map(
                (h) => (
                  <th
                    key={h}
                    className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider"
                    style={{ color: '#ef2628' }}
                  >
                    {h}
                  </th>
                )
              )}
            </tr>
          </thead>

          {/* Body */}
          <tbody className="bg-white divide-y divide-gray-100">
            {applications.map((app) => (
              <tr key={app.id} className="hover:bg-gray-50 transition-colors">

                <td className="px-6 py-4 text-sm font-semibold text-gray-900">
                  {app.company_name}
                </td>

                <td className="px-6 py-4 text-sm text-gray-600">
                  {app.job_title}
                </td>

                <td className="px-6 py-4 text-sm text-gray-500">
                  {app.job_type}
                </td>

                {/* Status */}
                <td className="px-6 py-4">
                  <span
                    className="px-2.5 py-1 text-xs font-semibold rounded-full"
                    style={{ cssText: getStatusBadge(app.status) }}
                  >
                    {app.status}
                  </span>
                </td>

                <td className="px-6 py-4 text-sm text-gray-500">
                  {new Date(app.applied_date).toLocaleDateString()}
                </td>

                {/* Actions */}
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end gap-3">

                    <Link
                      to={`/view/${app.id}`}
                      title="View"
                      className="text-gray-500 hover:opacity-70"
                    >
                      <Eye className="w-5 h-5" />
                    </Link>

                    <Link
                      to={`/edit/${app.id}`}
                      title="Edit"
                      className="text-[#ef2628] hover:opacity-70"
                    >
                      <Edit className="w-5 h-5" />
                    </Link>

                    <button
                      onClick={() => onDeleteClick(app)}
                      title="Delete"
                      className="text-[#f37e7e] hover:opacity-70"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>

                  </div>
                </td>

              </tr>
            ))}
          </tbody>

        </table>
      </div>
    </div>
  );
};

export default ApplicationTable;