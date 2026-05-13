interface CategoryBadgeProps {
  category: string;
  variant?: 'primary' | 'secondary' | 'tertiary' | 'featured';
  className?: string;
}

export function CategoryBadge({
  category,
  variant = 'primary',
  className = ''
}: CategoryBadgeProps) {
  const baseStyles = 'px-3 py-1.5 rounded-full text-label-md font-bold inline-block';

  const variants = {
    primary: 'bg-primary/10 text-primary',
    secondary: 'bg-secondary/10 text-secondary',
    tertiary: 'bg-tertiary/10 text-tertiary',
    featured: 'bg-secondary-container text-on-secondary-container'
  };

  return (
    <span className={`${baseStyles} ${variants[variant]} ${className}`}>
      {category}
    </span>
  );
}
