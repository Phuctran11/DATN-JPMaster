import { LevelBadge } from './LevelBadge';

interface ImageCardProps {
  src: string;
  alt: string;
  badge?: { label: string; variant?: 'glass' | 'solid' | 'outline' };
  overlay?: { color?: string; gradient?: boolean };
  aspectRatio?: 'square' | '16:9' | '4:3' | 'auto';
  hoverScale?: 105 | 110;
  rounded?: 'md' | 'lg' | 'xl' | '2xl';
  className?: string;
}

export function ImageCard({
  src,
  alt,
  badge,
  overlay,
  aspectRatio = 'square',
  hoverScale = 105,
  rounded = 'lg',
  className = ''
}: ImageCardProps) {
  const aspectRatioClasses = {
    square: 'aspect-square',
    '16:9': 'aspect-video',
    '4:3': 'aspect-[4/3]',
    auto: ''
  };

  const roundedClasses = {
    md: 'rounded-md',
    lg: 'rounded-lg',
    xl: 'rounded-xl',
    '2xl': 'rounded-2xl'
  };

  const hoverScaleClasses = hoverScale === 110 ? 'group-hover:scale-110 duration-700' : 'group-hover:scale-105 duration-500';

  const overlayStyle = overlay?.gradient
    ? 'absolute inset-0 bg-gradient-to-t from-black/60 to-transparent'
    : overlay?.color
    ? `absolute inset-0 ${overlay.color}`
    : '';

  return (
    <div className={`relative overflow-hidden ${aspectRatioClasses[aspectRatio]} ${roundedClasses[rounded]} group ${className}`}>
      <img
        src={src}
        alt={alt}
        className={`w-full h-full object-cover transition-transform ${hoverScaleClasses}`}
      />
      {(overlay?.gradient || overlay?.color) && <div className={overlayStyle} />}
      {badge && (
        <div className="absolute top-4 left-4 z-10">
          <LevelBadge level={badge.label} variant={badge.variant} />
        </div>
      )}
    </div>
  );
}
