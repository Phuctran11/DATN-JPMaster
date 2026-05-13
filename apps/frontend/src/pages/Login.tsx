import { useState } from 'react';
import { Input, Button, Icon } from '../components';
import { Heading, Text } from '../components/ui/Typography';

function LoginForm() {
  const [formData, setFormData] = useState({ email: '', password: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Login:', formData);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-[400px] space-y-stack-md">
      <Input
        id="email"
        label="Username/Email"
        type="email"
        placeholder="kintsugi@learning.jp"
        value={formData.email}
        onChange={handleChange}
      />

      <div className="space-y-stack-sm">
        <div className="flex justify-between items-center">
          <label htmlFor="password" className="font-label-md text-label-md text-on-surface-variant">
            Password
          </label>
          <a href="#" className="font-label-md text-label-md text-primary hover:underline transition-all">
            Forgot Password?
          </a>
        </div>
        <input
          id="password"
          type="password"
          placeholder="••••••••"
          value={formData.password}
          onChange={handleChange}
          className="w-full p-4 bg-surface-container-lowest border border-outline-variant rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all placeholder:text-outline-variant"
        />
      </div>

      <Button onClick={handleSubmit} className="w-full uppercase tracking-widest">
        Login
      </Button>

      {/* Divider */}
      <div className="relative py-4">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-outline-variant"></div>
        </div>
        <div className="relative flex justify-center">
          <span className="bg-surface px-4 text-on-surface-variant font-label-md text-label-md">OR</span>
        </div>
      </div>

      {/* Social Login */}
      <div className="grid grid-cols-2 gap-gutter">
        <button
          type="button"
          className="flex items-center justify-center gap-2 py-3 px-4 border border-outline-variant rounded-lg hover:bg-surface-container transition-all active:scale-95"
        >
          <img alt="Google" className="w-5 h-5" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCiqvpHB10RelFk0fT2lJnC_pEJgoocX_x1-HKwHZHHtHBwqZfm8adw-MhtMxK5A6MyzDpRGOZqt0VRQUs8Zz9tNPt__kGhnR7JQl0OLu6bMfwTOve_GHp91UJcOEog6Sqh8nMUKaCA6t_azkxcuEfJQtc9stD7NnxitRB6-iAVvHr0y4n86GgFHjLHdXRUSuVN2RUny9zIZ9Bgtl1qccX0IoJtCOoIb32QD-qFsTzQ_a-rN7VyEXD2eIHViz7mNH8wh1IfBZctVODz" />
          <span className="font-label-md text-label-md text-on-surface">Google</span>
        </button>
        <button
          type="button"
          className="flex items-center justify-center gap-2 py-3 px-4 border border-outline-variant rounded-lg hover:bg-surface-container transition-all active:scale-95"
        >
          <Icon name="ios" filled />
          <span className="font-label-md text-label-md text-on-surface">Apple</span>
        </button>
      </div>

      {/* Sign Up Link */}
      <p className="text-center pt-stack-md font-body-md text-on-surface-variant">
        New here?{' '}
        <a href="#" className="text-primary font-semibold hover:underline">
          Join the Academy
        </a>
      </p>
    </form>
  );
}

function LoginImage() {
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

export default function Login() {
  return (
    <main className="flex-grow flex items-center justify-center px-margin-mobile md:px-margin-desktop py-12 min-h-screen bg-background">
      <div className="max-w-[1280px] w-full bg-surface shadow-2xl overflow-hidden rounded-xl flex flex-col md:flex-row min-h-[700px] border border-outline-variant">
        <LoginImage />

        {/* Form Section */}
        <div
          className="w-full md:w-1/2 flex flex-col justify-center items-center p-8 md:p-16 relative"
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
            <Heading level="h2" size="headline-sm">
              Welcome Back
            </Heading>
            <Text variant="body-md" color="on-surface-variant">
              Continue your path to proficiency.
            </Text>
          </div>

          <LoginForm />

          {/* Floral Accent */}
          <div className="absolute top-4 right-4 opacity-10">
            <Icon name="filter_vintage" size="lg" />
          </div>
        </div>
      </div>
    </main>
  );
}
