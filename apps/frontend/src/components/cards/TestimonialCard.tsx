import { Card } from '../ui';
import { Text } from '../ui/Typography';

interface TestimonialCardProps {
  name: string;
  role: string;
  quote: string;
  initials?: string;
}

export function TestimonialCard({ name, role, quote, initials }: TestimonialCardProps) {
  const defaultInitials = name
    .split(' ')
    .map((n) => n[0])
    .join('');

  return (
    <Card className="p-8 border-l-4 border-secondary">
      <div className="flex items-center gap-4 mb-6">
        <div className="w-12 h-12 rounded-full bg-primary-fixed flex items-center justify-center font-bold text-primary">
          {initials || defaultInitials}
        </div>
        <div>
          <p className="font-bold text-on-surface">{name}</p>
          <p className="text-[12px] text-outline">{role}</p>
        </div>
      </div>
      <Text variant="body-md" color="on-surface-variant" className="italic">
        "{quote}"
      </Text>
    </Card>
  );
}
