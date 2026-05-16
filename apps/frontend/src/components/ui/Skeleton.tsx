export function SectionSkeleton({ className = '' }: { className?: string }) {
  return (
    <div className={`animate-pulse ${className}`}>
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="h-6 bg-surface-container rounded w-48 mb-6"></div>
        <div className="h-12 bg-surface-container rounded w-3/4 mb-6"></div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="h-56 bg-surface-container rounded"></div>
          <div className="h-56 bg-surface-container rounded"></div>
          <div className="h-56 bg-surface-container rounded"></div>
        </div>
      </div>
    </div>
  );
}

export function NewsletterSkeleton({ className = '' }: { className?: string }) {
  return (
    <div className={`animate-pulse ${className}`}>
      <div className="max-w-[1280px] mx-auto px-4 py-12">
        <div className="h-[320px] bg-surface-container rounded-[3rem]"></div>
      </div>
    </div>
  );
}

export function CardSkeleton({ className = '' }: { className?: string }) {
  return <div className={`h-40 bg-surface-container rounded ${className}`} />;
}

export default SectionSkeleton;
