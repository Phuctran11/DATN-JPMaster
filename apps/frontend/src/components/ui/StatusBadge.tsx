interface StatusBadgeProps {
  status: 'In Progress' | 'Completed' | 'Not Started';
  variant?: 'filled' | 'outline';
  className?: string;
}

export function StatusBadge({
  status,
  variant = 'filled',
  className = ''
}: StatusBadgeProps) {
  const baseStyles = 'px-3 py-1 rounded text-[12px] font-bold inline-block';

  const statusStyles = {
    'In Progress': {
      filled: 'bg-secondary text-on-secondary',
      outline: 'border border-secondary text-secondary'
    },
    'Completed': {
      filled: 'bg-green-100 text-green-700',
      outline: 'border border-green-700 text-green-700'
    },
    'Not Started': {
      filled: 'bg-gray-100 text-gray-600',
      outline: 'border border-gray-600 text-gray-600'
    }
  };

  return (
    <span className={`${baseStyles} ${statusStyles[status][variant]} ${className}`}>
      {status}
    </span>
  );
}
