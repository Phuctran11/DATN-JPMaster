import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Icon, IconButton } from './ui';
import { useAuth } from '../contexts/AuthContext';
import { useToastMessages } from '../hooks/useToastMessages';
import { useState } from 'react';

export function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const toastMessages = useToastMessages();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const isActive = (path: string) => location.pathname === path || location.pathname.startsWith(path + '/');

  const handleLogout = () => {
    logout();
    toastMessages.logoutSuccess();
    navigate('/login');
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      console.log('Search:', searchQuery);
    }
  };

  const notifications: any[] = [];
  const unreadCount = notifications.length;

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/courses', label: 'Courses' },
    { path: '/flashcards', label: 'Flashcards' },
    { path: '/tests', label: 'Tests' },
    { path: '/blog', label: 'Blog' },
  ];

  return (
    <header className="bg-surface/80 backdrop-blur-md sticky top-0 z-50 border-b border-outline-variant/50">
      <div className="flex justify-between items-center max-w-[1280px] mx-auto px-margin-mobile md:px-margin-desktop py-4 gap-2 md:gap-4">
        {/* Logo */}
        <Link to="/" className="text-headline-md font-headline-md text-primary font-bold tracking-tight hover:opacity-80 transition-opacity flex-shrink-0">
          JPMaster
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-gutter flex-1 justify-center">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`font-inter text-label-md transition-colors duration-200 ${
                isActive(link.path)
                  ? 'text-primary font-bold border-b-2 border-primary pb-1'
                  : 'text-on-surface-variant hover:text-primary'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Search Bar - Responsive */}
        <form
          onSubmit={handleSearch}
          className="flex items-center bg-surface-container rounded-full px-3 md:px-4 py-1.5 border border-outline-variant/50 focus-within:border-primary transition-colors flex-1 md:flex-none max-w-xs md:max-w-sm"
        >
          <Icon name="search" size="md" />
          <input
            className="bg-transparent border-none focus:ring-0 text-label-md px-2 md:px-2 py-1 outline-none w-full placeholder:text-on-surface-variant"
            placeholder="Search..."
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </form>

        {/* Right Section - Actions */}
        <div className="flex items-center gap-2 md:gap-3">
          {user ? (
            <>
              {/* Notification Bell */}
              <div className="relative">
                <IconButton
                  icon="notifications"
                  size="md"
                  badge={unreadCount}
                  onClick={() => setShowNotifications(!showNotifications)}
                />

                {showNotifications && (
                  <div className="absolute right-0 mt-2 w-80 bg-surface border border-outline-variant rounded-lg shadow-lg z-50">
                    <div className="px-4 py-3 border-b border-outline-variant">
                      <p className="font-semibold text-on-surface">Notifications</p>
                    </div>
                    {notifications.length > 0 ? (
                      <div className="max-h-96 overflow-y-auto">
                        {notifications.map((notif: any) => (
                          <div key={notif.id} className="px-4 py-3 border-b border-outline-variant/30 hover:bg-surface-container transition-colors cursor-pointer">
                            <p className="text-sm text-on-surface">{notif.message}</p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="px-4 py-8 text-center text-on-surface-variant">
                        <div className="inline-block opacity-50 mb-2">
                          <Icon name="notifications_none" size="lg" />
                        </div>
                        <p className="text-sm">No notifications</p>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* User Avatar Menu */}
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center hover:opacity-80 transition-all"
                >
                  <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-on-primary font-bold text-sm">
                    {user.username.charAt(0).toUpperCase()}
                  </div>
                </button>

                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-56 bg-surface border border-outline-variant rounded-lg shadow-lg z-50">
                    <div className="px-4 py-3 border-b border-outline-variant">
                      <p className="font-semibold text-on-surface text-sm">{user.username}</p>
                      <p className="text-xs text-on-surface-variant break-all">{user.email}</p>
                    </div>
                    <button
                      onClick={() => {
                        setShowUserMenu(false);
                        navigate('/profile');
                      }}
                      className="block w-full text-left px-4 py-3 text-label-md text-on-surface hover:bg-surface-container transition-colors flex items-center gap-2"
                    >
                      <Icon name="person" size="md" />
                      Profile
                    </button>
                    <button
                      onClick={() => {
                        setShowUserMenu(false);
                        navigate('/settings');
                      }}
                      className="block w-full text-left px-4 py-3 text-label-md text-on-surface hover:bg-surface-container transition-colors flex items-center gap-2 border-t border-outline-variant/30"
                    >
                      <Icon name="settings" size="md" />
                      Settings
                    </button>
                    <button
                      onClick={() => {
                        setShowUserMenu(false);
                        handleLogout();
                      }}
                      className="block w-full text-left px-4 py-3 text-label-md text-error hover:bg-surface-container transition-colors flex items-center gap-2 rounded-b-lg border-t border-outline-variant/30"
                    >
                      <Icon name="logout" size="md" />
                      Logout
                    </button>
                  </div>
                )}
              </div>

              {/* Mobile Menu Toggle */}
              <IconButton
                icon={showMobileMenu ? 'close' : 'menu'}
                size="md"
                className="lg:hidden"
                onClick={() => setShowMobileMenu(!showMobileMenu)}
              />
            </>
          ) : (
            <>
              <button
                onClick={() => navigate('/login')}
                className="text-label-md font-inter text-primary py-2 px-4 hover:opacity-80 transition-all"
              >
                Sign In
              </button>
              <button
                onClick={() => navigate('/signup')}
                className="bg-primary text-on-primary text-label-md font-inter py-2.5 px-6 rounded-full hover:shadow-lg hover:shadow-primary/20 transition-all hidden sm:block"
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
            </>
          )}
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {showMobileMenu && (
        <div className="lg:hidden border-t border-outline-variant/50 bg-surface/95 backdrop-blur-sm">
          <nav className="flex flex-col">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setShowMobileMenu(false)}
                className={`px-margin-mobile py-3 text-label-md font-inter transition-colors border-b border-outline-variant/30 ${
                  isActive(link.path)
                    ? 'text-primary font-bold bg-surface-container'
                    : 'text-on-surface-variant hover:text-primary hover:bg-surface-container'
                }`}
              >
                {link.label}
              </Link>
            ))}
            {!user && (
              <>
                <button
                  onClick={() => {
                    navigate('/login');
                    setShowMobileMenu(false);
                  }}
                  className="px-margin-mobile py-3 text-label-md font-inter text-primary hover:bg-surface-container transition-colors border-t border-outline-variant/30 text-left"
                >
                  Sign In
                </button>
                <button
                  onClick={() => {
                    navigate('/signup');
                    setShowMobileMenu(false);
                  }}
                  className="px-margin-mobile py-3 text-label-md font-inter text-on-surface hover:bg-surface-container transition-colors border-t border-outline-variant/30 text-left"
                >
                  Sign Up
                </button>
              </>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
