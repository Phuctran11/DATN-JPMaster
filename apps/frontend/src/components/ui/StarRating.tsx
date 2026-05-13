interface StarRatingProps {
  rating: number;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function StarRating({
  rating,
  size = 'md',
  className = ''
}: StarRatingProps) {
  const sizeClasses = {
    sm: 'text-sm',
    md: 'text-lg',
    lg: 'text-2xl'
  };

  return (
    <div className={`flex gap-1 text-secondary ${sizeClasses[size]} ${className}`}>
      {[...Array(5)].map((_, i) => (
        <span
          key={i}
          className="material-symbols-outlined fill-1"
          style={{
            opacity: i < Math.round(rating) ? 1 : 0.3
          }}
        >
          star
        </span>
      ))}
    </div>
  );
}
