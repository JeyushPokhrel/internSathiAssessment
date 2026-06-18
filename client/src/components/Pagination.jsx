import { ChevronLeft, ChevronRight } from 'lucide-react';

const Pagination = ({ pagination, onPageChange }) => {
  if (!pagination || pagination.totalPages <= 1) return null;

  const { page, totalPages } = pagination;

  return (
    <div className="flex items-center justify-between px-4 py-3 bg-white border-t border-gray-100 rounded-b-xl">

      {/* Page info */}
      <p className="text-sm text-gray-500">
        Page <span className="font-semibold">{page}</span> of{' '}
        <span className="font-semibold">{totalPages}</span>
      </p>

      {/* Navigation */}
      <div className="flex gap-2">

        <button
          onClick={() => onPageChange(page - 1)}
          disabled={page === 1}
          className="inline-flex items-center px-3 py-1.5 text-sm font-medium rounded-lg border transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          style={{ borderColor: '#f37e7e', color: '#ef2628' }}
        >
          <ChevronLeft className="h-4 w-4 mr-1" />
          Previous
        </button>

        <button
          onClick={() => onPageChange(page + 1)}
          disabled={page === totalPages}
          className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-white rounded-lg transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          style={{ backgroundColor: '#ef2628' }}
        >
          Next
          <ChevronRight className="h-4 w-4 ml-1" />
        </button>

      </div>
    </div>
  );
};

export default Pagination;