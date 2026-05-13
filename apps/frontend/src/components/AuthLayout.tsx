import { Icon } from '../components';

interface AuthLayoutProps {
  children: React.ReactNode;
  showImage?: boolean;
  title: string;
  subtitle: string;
}

function AuthImage() {
  return (
    <div className="hidden md:block md:w-1/2 relative overflow-hidden bg-primary-container">
      <img
        alt="Zen Garden Torii"
        className="absolute inset-0 w-full h-full object-cover opacity-90"
        src="https://lh3.googleusercontent.com/aida-public/AB6AXuDX650xFRxGq9Li0_MH_0DabrWzfLVCCjUeiI9FhBnuB19XJyFbpZ0oY4W9NTr90fVe_UUaTvQY2CJVUFlrEU2MKureWq9hz0aVgKdwdeoVxAVL_0jX-WPmb0lR3oK2FbAOzcwwwh1w1Pg4uSnfZ0k_BzSR4hxobAowCSqBtVmcFIEbIepG2vXLeUr-kGMVLphYJMnoE7or9pjGrCaJeLxEs7NGwoJvgMM7jPEwXgW7B2mb68Ilv5__dYNBnGbNK_93AZbj2WBJw44u"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-primary-container via-transparent to-transparent opacity-60"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-transparent to-surface opacity-10"></div>
      <div className="absolute bottom-12 left-12 right-12 text-on-primary">
        <h1 className="font-headline-lg text-headline-lg mb-2">Master the Nuance.</h1>
        <p className="font-body-lg text-body-lg text-primary-fixed">
          The gateway to academic excellence in the Japanese language.
        </p>
      </div>
    </div>
  );
}

export function AuthLayout({ children, showImage = true, title, subtitle }: AuthLayoutProps) {
  return (
    <main className="flex-grow flex items-center justify-center px-margin-mobile md:px-margin-desktop py-12 min-h-screen bg-background">
      <div className="max-w-[1280px] w-full bg-surface shadow-2xl overflow-hidden rounded-xl flex flex-col md:flex-row min-h-[700px] border border-outline-variant">
        {showImage && <AuthImage />}

        {/* Form Section */}
        <div
          className={`w-full ${showImage ? 'md:w-1/2' : ''} flex flex-col justify-center items-center p-8 md:p-16 relative`}
          style={{
            backgroundImage:
              'linear-gradient(90deg, transparent 95%, rgba(0,0,0,0.02) 95%), linear-gradient(transparent 95%, rgba(0,0,0,0.02) 95%)',
            backgroundSize: '40px 40px',
          }}
        >
          <div className="text-center mb-stack-lg">
            <div className="text-primary font-headline-md text-headline-md font-bold tracking-tight mb-2">
              JPMaster
            </div>
            <div className="h-1 w-12 bg-secondary-container mx-auto mb-6"></div>
            <h2 className="font-headline-sm text-headline-sm text-on-surface">{title}</h2>
            <p className="font-body-md text-body-md text-on-surface-variant">{subtitle}</p>
          </div>

          {children}

          {/* Floral Accent */}
          <div className="absolute top-4 right-4 opacity-10">
            <Icon name="filter_vintage" size="lg" />
          </div>
        </div>
      </div>
    </main>
  );
}
