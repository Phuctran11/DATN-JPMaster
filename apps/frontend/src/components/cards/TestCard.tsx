import { Card } from '../ui';
import { Heading } from '../ui/Typography';

interface TestCardProps {
  title: string;
  level: string;
  levelColor?: string;
  type: string;
  duration: string;
  image: string;
  onStart?: () => void;
}

export function TestCard({
  title,
  level,
  levelColor = 'bg-primary',
  type,
  duration,
  image,
  onStart,
}: TestCardProps) {
  return (
    <Card className="bg-surface border border-outline-variant hover:shadow-lg transition-all duration-300 flex flex-col group">
      <div className="p-stack-lg flex-grow">
        <div className="flex justify-between items-start mb-stack-md">
          <span className={`px-3 py-1 ${levelColor} text-white text-[12px] font-bold rounded uppercase tracking-wider`}>
            {level}
          </span>
          <span className="material-symbols-outlined text-outline group-hover:text-secondary transition-colors">
            bookmark
          </span>
        </div>
        <Heading level="h3" size="headline-sm" className="text-on-surface mb-stack-sm leading-tight">
          {title}
        </Heading>
        <div className="flex gap-stack-sm mb-stack-lg">
          <span className="text-label-md text-on-surface-variant flex items-center gap-1">
            <span className="material-symbols-outlined text-[16px]">description</span>
            {type}
          </span>
          <span className="text-label-md text-on-surface-variant flex items-center gap-1">
            <span className="material-symbols-outlined text-[16px]">schedule</span>
            {duration}
          </span>
        </div>
        <img className="w-full h-40 object-cover rounded mb-stack-md opacity-90 group-hover:opacity-100 transition-opacity" alt={title} src={image} />
      </div>
      <div className="px-stack-lg pb-stack-lg">
        <button
          onClick={onStart}
          className="w-full py-3 bg-primary text-on-primary font-semibold text-label-md hover:opacity-90 transition-all flex items-center justify-center gap-2"
        >
          Start Test <span className="material-symbols-outlined text-[18px]">play_arrow</span>
        </button>
      </div>
    </Card>
  );
}
