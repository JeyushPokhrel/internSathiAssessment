import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Plus } from 'lucide-react';

import { getApplications, deleteApplication } from '../services/api';
import ApplicationTable from '../components/ApplicationTable';
import SearchBar from '../components/SearchBar';
import StatusFilter from '../components/StatusFilter';
import Pagination from '../components/Pagination';
import DeleteModal from '../components/DeleteModal';

const ApplicationList = () => {
  // Data
  const [applications, setApplications] = useState([]);
  const [pagination, setPagination] = useState(null);

  // UI state
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Filters
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('All');
  const [page, setPage] = useState(1);

  // Debounced search
  const [debouncedSearch, setDebouncedSearch] = useState('');

  // Delete modal state
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [appToDelete, setAppToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
      setPage(1);
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);

  // Fetch applications
  const fetchApplications = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await getApplications({
        page,
        limit: 10,
        search: debouncedSearch,
        status,
      });

      if (data.success) {
        setApplications(data.data);
        setPagination(data.pagination);
      } else {
        setError(data.message || 'Failed to load applications.');
      }
    } catch (err) {
      setError(
        err.response?.data?.message ||
          'Could not connect to the server.'
      );
    } finally {
      setLoading(false);
    }
  }, [page, debouncedSearch, status]);

  useEffect(() => {
    fetchApplications();
  }, [fetchApplications]);

  // Handlers
  const handleStatusChange = (newStatus) => {
    setStatus(newStatus);
    setPage(1);
  };

  const handleDeleteClick = (app) => {
    setAppToDelete(app);
    setDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (!appToDelete) return;

    setIsDeleting(true);

    try {
      const data = await deleteApplication(appToDelete.id);

      if (data.success) {
        setDeleteModalOpen(false);
        setAppToDelete(null);
        fetchApplications();
      } else {
        setError(data.message || 'Failed to delete application.');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete application.');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            My Applications
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Track all your job applications in one place.
          </p>
        </div>

        <Link
          to="/add"
          className="inline-flex items-center px-4 py-2 text-sm font-medium text-white rounded-lg shadow-sm"
          style={{ backgroundColor: '#ef2628' }}
        >
          <Plus className="w-5 h-5 mr-2" />
          Add Application
        </Link>
      </div>

      {/* Filters */}
      <div className="bg-white shadow-sm rounded-xl p-4 mb-6 border border-gray-100">
        <div className="flex flex-col md:flex-row gap-4">
          <SearchBar value={search} onChange={setSearch} />
          <StatusFilter value={status} onChange={handleStatusChange} />
        </div>
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

      {/* Loading / Content */}
      {loading ? (
        <div className="flex justify-center items-center py-20">
          <p className="text-lg font-medium" style={{ color: '#ef2628' }}>
            Loading ...
          </p>
        </div>
      ) : (
        <>
          <ApplicationTable
            applications={applications}
            onDeleteClick={handleDeleteClick}
          />

          <Pagination
            pagination={pagination}
            onPageChange={setPage}
          />
        </>
      )}

      {/* Delete modal */}
      <DeleteModal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={confirmDelete}
        appName={appToDelete?.company_name}
        isDeleting={isDeleting}
      />
    </div>
  );
};

export default ApplicationList;