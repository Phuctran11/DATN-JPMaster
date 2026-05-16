import { useNavigate } from 'react-router-dom';
import { IconButton } from '../ui';

interface AuthActionsProps {
  showMobileMenu: boolean;
  setShowMobileMenu: (value: boolean) => void;
}

export function AuthActions({ showMobileMenu, setShowMobileMenu }: AuthActionsProps) {
  const navigate = useNavigate();

  return (
    <div className="flex items-center gap-2 md:gap-3">
      <button
        onClick={() => navigate('/login')}
        className="text-label-md font-inter text-primary py-2 px-4 hover:opacity-80 transition-all font-semibold"
      >
        Sign In
      </button>
      <button
        onClick={() => navigate('/signup')}
        className="bg-gradient-to-r from-primary to-secondary text-on-primary text-label-md font-inter py-2.5 px-6 rounded-full hover:shadow-lg hover:shadow-primary/30 transition-all hidden sm:block font-semibold"
      >
        Sign Up
      </button>
      {/* Mobile Menu Toggle */}
      <IconButton
        icon={showMobileMenu ? 'close' : 'menu'}
        size="md"
        className="lg:hidden"
        onClick={() => setShowMobileMenu(!showMobileMenu)}
      />
    </div>
  );
}
