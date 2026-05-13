interface FeatureItemProps {
  icon: string;
  title: string;
  description: string;
  variant?: 'primary' | 'secondary' | 'tertiary';
  className?: string;
}

export function FeatureItem({
  icon,
  title,
  description,
  variant = 'primary',
  className = ''
}: FeatureItemProps) {
  const colorClasses = {
    primary: 'bg-primary text-primary',
    secondary: 'bg-secondary text-secondary',
    tertiary: 'bg-tertiary text-tertiary'
  };

  const [bgColor, textColor] = colorClasses[variant].split(' ');

  return (
    <div className={`flex gap-4 ${className}`}>
      <div className={`flex-shrink-0 w-12 h-12 rounded-xl ${bgColor}/5 flex items-center justify-center ${textColor}`}>
        <span className="material-symbols-outlined">{icon}</span>
      </div>
      <div>
        <h4 className={`font-bold ${textColor}`}>{title}</h4>
        <p className="text-sm text-on-surface-variant">{description}</p>
      </div>
    </div>
  );
}
