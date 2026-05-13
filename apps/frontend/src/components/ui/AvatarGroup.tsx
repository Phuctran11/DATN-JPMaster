interface AvatarItemProps {
  initials: string;
  color: string;
}

interface AvatarGroupProps {
  avatars: AvatarItemProps[];
  maxShow?: number;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function AvatarGroup({
  avatars,
  maxShow = 3,
  size = 'md',
  className = ''
}: AvatarGroupProps) {
  const sizeClasses = {
    sm: 'w-10 h-10 text-[12px]',
    md: 'w-14 h-14 text-[14px]',
    lg: 'w-16 h-16 text-[16px]'
  };

  const displayedAvatars = avatars.slice(0, maxShow);
  const remainingCount = avatars.length - maxShow;

  return (
    <div className={`flex items-center -space-x-3 ${className}`}>
      {displayedAvatars.map((avatar, idx) => (
        <div
          key={idx}
          className={`${sizeClasses[size]} rounded-full border-4 border-white shadow-lg flex items-center justify-center font-bold text-white`}
          style={{ backgroundColor: avatar.color, zIndex: displayedAvatars.length - idx }}
        >
          {avatar.initials}
        </div>
      ))}
      {remainingCount > 0 && (
        <div
          className={`${sizeClasses[size]} rounded-full border-4 border-white shadow-lg flex items-center justify-center font-bold text-white bg-gray-400`}
          style={{ zIndex: 0 }}
        >
          +{remainingCount}
        </div>
      )}
    </div>
  );
}
