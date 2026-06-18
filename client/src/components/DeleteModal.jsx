const DeleteModal = ({
  isOpen,
  onClose,
  onConfirm,
  appName,
  isDeleting,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">

      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black opacity-40"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-xl shadow-xl max-w-sm w-full p-6 z-10">

        {/* Warning icon */}
        <div
          className="flex items-center justify-center w-12 h-12 rounded-full mx-auto mb-4"
          style={{ backgroundColor: '#fef6f6' }}
        >
          <svg
            className="h-6 w-6"
            style={{ color: '#ef2628' }}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </div>

        {/* Title */}
        <h3 className="text-lg font-semibold text-gray-900 text-center mb-2">
          Delete Application
        </h3>

        {/* Message */}
        <p className="text-sm text-gray-500 text-center mb-6">
          Are you sure you want to delete your application for{' '}
          <span className="font-semibold text-gray-700">{appName}</span>?
          This action cannot be undone.
        </p>

        {/* Actions */}
        <div className="flex gap-3">

          <button
            onClick={onClose}
            disabled={isDeleting}
            className="flex-1 px-4 py-2 text-sm text-gray-700 border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            disabled={isDeleting}
            className="flex-1 px-4 py-2 text-sm text-white rounded-lg disabled:opacity-50"
            style={{ backgroundColor: '#ef2628' }}
          >
            {isDeleting ? 'Deleting...' : 'Delete'}
          </button>

        </div>
      </div>
    </div>
  );
};

export default DeleteModal;