import { Link } from 'react-router-dom';

interface NavLink {
  path: string;
  label: string;
}

interface NavigationMenuProps {
  navLinks: NavLink[];
  isActive: (path: string) => boolean;
}

export function NavigationMenu({ navLinks, isActive }: NavigationMenuProps) {
  return (
    <nav className="hidden lg:flex items-center space-x-gutter flex-1 justify-center">
      {navLinks.map((link) => (
        <Link
          key={link.path}
          to={link.path}
          className={`font-inter text-label-md transition-all duration-300 relative group ${
            isActive(link.path)
              ? 'text-primary font-bold'
              : 'text-on-surface-variant hover:text-primary'
          }`}
        >
          {link.label}
          {isActive(link.path) && (
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary to-secondary rounded-full"></span>
          )}
          {!isActive(link.path) && (
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary to-secondary rounded-full scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></span>
          )}
        </Link>
      ))}
    </nav>
  );
}
