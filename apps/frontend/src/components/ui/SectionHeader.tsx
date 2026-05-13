import { Heading, Text } from './Typography';
import { Badge } from './index';

interface SectionHeaderProps {
  badge?: string;
  title: string;
  description?: string;
  cta?: { label: string; href: string };
  badgeVariant?: 'primary' | 'secondary' | 'tertiary';
  className?: string;
}

export function SectionHeader({
  badge,
  title,
  description,
  cta,
  badgeVariant = 'primary',
  className = ''
}: SectionHeaderProps) {
  return (
    <div className={`text-center mb-12 ${className}`}>
      {badge && (
        <div className="mb-4">
          <Badge variant={badgeVariant}>{badge}</Badge>
        </div>
      )}
      <Heading level="h2" size="headline-lg" className="mb-4">
        {title}
      </Heading>
      {description && (
        <Text variant="body-lg" color="on-surface-variant" className="max-w-2xl mx-auto mb-8">
          {description}
        </Text>
      )}
      {cta && (
        <a
          href={cta.href}
          className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all"
        >
          {cta.label}
          <span className="material-symbols-outlined">arrow_forward</span>
        </a>
      )}
    </div>
  );
}
