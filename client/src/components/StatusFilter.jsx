

const StatusFilter = ({ value, onChange }) => {

  const statuses = ['All', 'Applied', 'Interviewing', 'Offer', 'Rejected'];

  return (
    <div className="flex flex-wrap gap-2">
      {statuses.map((status) => {
        const isSelected = value === status;
        return (
          <button
            key={status}
            onClick={() => onChange(status)}
            className="px-4 py-1.5 rounded-full text-sm font-medium transition-all border"
            style={{
              backgroundColor: isSelected ? '#ef2628' : 'white',
              color:           isSelected ? 'white'    : '#6b7280',
              borderColor:     isSelected ? '#ef2628'  : '#e5e7eb',
            }}
          >
            {status}
          </button>
        );
      })}
    </div>
  );
};

export default StatusFilter;
