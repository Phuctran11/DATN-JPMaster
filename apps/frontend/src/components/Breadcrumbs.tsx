import { useNavigate } from 'react-router-dom';
import { Container } from './index';

export interface BreadcrumbItem {
  label: string;
  path?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  const navigate = useNavigate();

  return (
    <nav className="bg-surface py-3 border-b border-outline-variant" aria-label="Breadcrumb">
      <Container>
        <div className="flex items-center gap-2 text-label-sm text-on-surface-variant">
          {items.map((item, index) => (
            <div key={index} className="flex items-center gap-2">
              {index > 0 && (
                <span className="material-symbols-outlined text-[16px] text-outline-variant">
                  chevron_right
                </span>
              )}
              {item.path ? (
                <button
                  onClick={() => navigate(item.path!)}
                  className="text-primary hover:text-primary-dark hover:underline transition-colors cursor-pointer"
                >
                  {item.label}
                </button>
              ) : (
                <span className="text-on-surface">{item.label}</span>
              )}
            </div>
          ))}
        </div>
      </Container>
    </nav>
  );
}
