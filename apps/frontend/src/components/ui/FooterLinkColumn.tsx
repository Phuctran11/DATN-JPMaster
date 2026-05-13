interface FooterLink {
  label: string;
  url: string;
}

interface FooterLinkColumnProps {
  title: string;
  links: FooterLink[];
  className?: string;
}

export function FooterLinkColumn({ title, links, className = '' }: FooterLinkColumnProps) {
  return (
    <div className={`space-y-6 ${className}`}>
      <h5 className="font-bold text-primary uppercase tracking-wider text-xs">{title}</h5>
      <ul className="space-y-3">
        {links.map((link) => (
          <li key={link.label}>
            <a href={link.url} className="font-inter text-label-md text-on-surface-variant hover:text-primary transition-all">
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
