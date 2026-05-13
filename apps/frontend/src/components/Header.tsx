import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Icon } from './ui';

export function Header() {
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path: string) => location.pathname === path || location.pathname.startsWith(path + '/');

  return (
    <header className="bg-surface/80 backdrop-blur-md sticky top-0 z-50 border-b border-outline-variant/50">
      <div className="flex justify-between items-center max-w-[1280px] mx-auto px-margin-desktop py-4">
        <Link to="/" className="text-headline-md font-headline-md text-primary font-bold tracking-tight hover:opacity-80 transition-opacity">
          JPMaster
        </Link>

        <nav className="hidden md:flex items-center space-x-gutter">
          <Link
            to="/"
            className={`font-inter text-label-md transition-colors duration-200 ${isActive('/') && location.pathname === '/' ? 'text-primary font-bold border-b-2 border-primary pb-1' : 'text-on-surface-variant hover:text-primary'}`}
          >
            Home
          </Link>
          <Link
            to="/courses"
            className={`font-inter text-label-md transition-colors duration-200 ${isActive('/courses') ? 'text-primary font-bold border-b-2 border-primary pb-1' : 'text-on-surface-variant hover:text-primary'}`}
          >
            Courses
          </Link>
          <Link
            to="/flashcards"
            className={`font-inter text-label-md transition-colors duration-200 ${isActive('/flashcards') ? 'text-primary font-bold border-b-2 border-primary pb-1' : 'text-on-surface-variant hover:text-primary'}`}
          >
            Flashcards
          </Link>
          <Link
            to="/tests"
            className={`font-inter text-label-md transition-colors duration-200 ${isActive('/tests') ? 'text-primary font-bold border-b-2 border-primary pb-1' : 'text-on-surface-variant hover:text-primary'}`}
          >
            Tests
          </Link>
          <Link
            to="/blog"
            className={`font-inter text-label-md transition-colors duration-200 ${isActive('/blog') ? 'text-primary font-bold border-b-2 border-primary pb-1' : 'text-on-surface-variant hover:text-primary'}`}
          >
            Blog
          </Link>
        </nav>

        <div className="flex items-center gap-stack-md">
          <div className="hidden lg:flex items-center bg-surface-container rounded-full px-4 py-1.5 border border-outline-variant/50 focus-within:border-primary transition-colors">
            <Icon name="search" size="md" />
            <input
              className="bg-transparent border-none focus:ring-0 text-label-md w-32 focus:w-48 transition-all outline-none"
              placeholder="Search..."
              type="text"
            />
          </div>
          <button
            onClick={() => navigate('/login')}
            className="text-label-md font-inter text-primary py-2 px-4 hover:opacity-80 transition-all"
          >
            Login
          </button>
          <button
            onClick={() => navigate('/signup')}
            className="bg-primary text-on-primary text-label-md font-inter py-2.5 px-6 rounded-full hover:shadow-lg hover:shadow-primary/20 transition-all"
          >
            Sign Up
          </button>
        </div>
      </div>
    </header>
  );
}
