interface FloatingCardProps {
  icon: string;
  title: string;
  description: string;
  position: { top?: string; bottom?: string; left?: string; right?: string };
  className?: string;
}

export function FloatingCard({
  icon,
  title,
  description,
  position,
  className = ''
}: FloatingCardProps) {
  const positionClasses = Object.entries(position)
    .map(([key, value]) => value ? `${key}-${value}` : '')
    .join(' ');

  return (
    <div className={`absolute ${positionClasses} glass-card p-4 rounded-2xl shadow-xl w-48 hidden md:block animate-bounce-subtle ${className}`}>
      <span className="material-symbols-outlined text-secondary bg-secondary/10 p-2 rounded-lg mb-2 inline-block">
        {icon}
      </span>
      <div className="font-bold text-primary">{title}</div>
      <p className="text-xs text-on-surface-variant">{description}</p>
    </div>
  );
}
