import { SocialLinks, FooterLinkColumn } from './ui';

export function Footer() {
  const socialLinks = [
    { icon: 'public', url: '#', label: 'Website' },
    { icon: 'chat_bubble', url: '#', label: 'Chat' },
    { icon: 'alternate_email', url: '#', label: 'Email' },
  ];

  const platformLinks = [
    { label: 'All Courses', url: '#' },
    { label: 'Flashcards', url: '#' },
    { label: 'Mock Tests', url: '#' },
    { label: 'JLPT Guide', url: '#' },
  ];

  const aboutLinks = [
    { label: 'Our Story', url: '#' },
    { label: 'Careers', url: '#' },
    { label: 'Privacy Policy', url: '#' },
    { label: 'Terms of Service', url: '#' },
  ];

  return (
    <footer className="bg-surface-container-low border-t border-outline-variant/50 relative">
      <div className="max-w-[1280px] mx-auto px-margin-desktop py-20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 lg:gap-gutter">
          {/* Brand Column */}
          <div className="space-y-6">
            <div className="text-2xl font-bold text-primary tracking-tighter">JPMaster</div>
            <p className="text-label-md font-inter text-on-surface-variant leading-relaxed">
              Setting the global standard for academic Japanese education through technology and discipline.
            </p>
            <SocialLinks links={socialLinks} size="md" />
          </div>

          {/* Links Columns */}
          <FooterLinkColumn title="Platform" links={platformLinks} />
          <FooterLinkColumn title="About" links={aboutLinks} />

          {/* Contact Column */}
          <div className="space-y-6">
            <h5 className="font-bold text-primary uppercase tracking-wider text-xs">Support</h5>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-label-md text-on-surface-variant">
                <span className="material-symbols-outlined text-primary text-lg">mail</span>
                academic@jpmaster.edu
              </li>
              <li className="flex items-start gap-3 text-label-md text-on-surface-variant">
                <span className="material-symbols-outlined text-primary text-lg">location_on</span>
                Chiyoda City, Tokyo, Japan
              </li>
              <li className="pt-2">
                <a href="#" className="font-inter text-label-md text-primary font-bold inline-flex items-center gap-2 group">
                  Support Center
                  <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">east</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-20 pt-8 border-t border-outline-variant/30 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-on-surface-variant/60 font-medium uppercase tracking-[0.2em]">
          <span>© 2024 JPMaster Inc.</span>
          <div className="flex gap-8">
            <a href="#" className="hover:text-primary transition-colors">Cookies</a>
            <a href="#" className="hover:text-primary transition-colors">Security</a>
            <a href="#" className="hover:text-primary transition-colors">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
