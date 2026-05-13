import { useState } from 'react';
import { Input, Select, Button, GlassCard, Icon } from '../components';
import { Heading, Text } from '../components/ui/Typography';

function SignupForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    level: 'beginner',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Signup:', formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-stack-md w-full">
      <Input
        id="name"
        label="Full Name"
        type="text"
        placeholder="Yukio Mishima"
        value={formData.name}
        onChange={handleChange}
      />

      <Input
        id="email"
        label="Email Address"
        type="email"
        placeholder="student@jpmaster.edu"
        value={formData.email}
        onChange={handleChange}
      />

      <Select
        id="level"
        label="Student Level"
        value={formData.level}
        onChange={handleChange}
        options={[
          { value: 'beginner', label: 'Beginner (N5/N4)' },
          { value: 'intermediate', label: 'Intermediate (N3/N2)' },
          { value: 'advanced', label: 'Advanced (N1)' },
        ]}
      />

      {/* Password Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-stack-md">
        <Input
          id="password"
          label="Password"
          type="password"
          value={formData.password}
          onChange={handleChange}
        />
        <Input
          id="confirmPassword"
          label="Confirm Password"
          type="password"
          value={formData.confirmPassword}
          onChange={handleChange}
        />
      </div>

      <Button type="submit" className="w-full mt-stack-lg flex items-center justify-center gap-2 group">
        Create Account
        <Icon name="arrow_right_alt" size="md" />
      </Button>

      <div className="pt-stack-md text-center">
        <Text variant="body-md" color="on-surface-variant">
          Already have an account?{' '}
          <a href="#" className="text-primary font-semibold hover:underline underline-offset-4">
            Login
          </a>
        </Text>
      </div>
    </form>
  );
}

function SignupDecorations() {
  return (
    <>
      {/* Sakura Branch */}
      <div className="absolute top-20 right-0 w-1/3 h-full pointer-events-none overflow-hidden opacity-80 mix-blend-multiply hidden lg:block">
        <img
          className="w-full h-full object-contain object-right-top transform scale-125"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuAfYvwYjUnRoL5hB2NDmwFnbuyrh7iU2U48LOHkBU4pcdJdYVigwUuGjboCZ0GxNhQRysnuL9z2kJGTkvLv89aE_xUzjzgYEgA0UmNiAE3Wkbe3pHvUxPJ_sgWmp518yf3tWBIS2wz29D-ElaGKU1k4YlVSde9l3-VUds3bnDNyBRpfkMU2-fTG05iRvvvnBBUy73MQUatj7GkGeXxinbup__iubzbpX28dirzqe68kAv42nY27g0EYCQU-YLlAwZZel-seQK5716DF"
          alt="Sakura"
        />
      </div>

      {/* Wave Pattern */}
      <div className="absolute bottom-0 left-0 w-1/4 h-1/2 pointer-events-none opacity-40 hidden lg:block">
        <img
          className="w-full h-full object-contain object-left-bottom grayscale"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuDlJCc00W2ETSpzLSsBMgTsN4xXxcYuvkrlhm13n5-cNxlg5a-3zWtvVKbzR7j0gxh3ODHAZreuWBSguP9YxI7hUvT3zgQmYgEO8RglO9bFO68EtMOA7j-O5-xN7nFQS8Kfh4lmbXIGbb_NkzoOc6CGr8xhezHKaitAnNtLOQpruSkW2aw47TF8Yd31UDTu3RLvIcB9nBh71N2Epy6o8zQSQ8jd8u3XRKWkgUbmSCHTC-F5G6WTfDdk8qkuGdF1B0H03i-JV33Cj7kJ"
          alt="Wave pattern"
        />
      </div>
    </>
  );
}

function SignupBentoCards() {
  return (
    <div className="mt-12 grid grid-cols-2 gap-4 border-t border-outline-variant/30 pt-8">
      <div className="flex items-start gap-3">
        <div className="p-2 bg-secondary-fixed rounded-lg">
          <Icon name="verified_user" />
        </div>
        <div>
          <span className="block font-label-md text-[12px] text-on-surface-variant uppercase tracking-wider">
            Accredited
          </span>
          <span className="block font-body-md text-on-surface font-semibold">Global Standards</span>
        </div>
      </div>
      <div className="flex items-start gap-3">
        <div className="p-2 bg-tertiary-fixed rounded-lg">
          <Icon name="import_contacts" />
        </div>
        <div>
          <span className="block font-label-md text-[12px] text-on-surface-variant uppercase tracking-wider">
            Resource
          </span>
          <span className="block font-body-md text-on-surface font-semibold">2,000+ Kanji</span>
        </div>
      </div>
    </div>
  );
}

export default function Signup() {
  return (
    <main
      className="relative min-h-screen pt-24 pb-section-gap flex items-center justify-center bg-background"
      style={{
        backgroundColor: '#faf8ff',
        backgroundImage:
          'url("data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 width=%2780%27 height=%2740%27 viewBox=%270 0 80 40%27%3E%3Cpath d=%27M0 40c4.5 0 9-2 12-5s7.5-3 12-3 9 2 12 5 7.5 3 12 3 9-2 12-5 7.5-3 12-3 9 2 12 5M0 20c4.5 0 9-2 12-5s7.5-3 12-3 9 2 12 5 7.5 3 12 3 9-2 12-5 7.5-3 12-3 9 2 12 5%27 fill=%27none%27 stroke=%27%23e5e7eb%27 stroke-width=%271%27/%3E%3C/svg%3E")',
      }}
    >
      {/* Decorative Elements */}
      <SignupDecorations />

      {/* Registration Container */}
      <div className="container mx-auto px-margin-mobile md:px-margin-desktop flex justify-center lg:justify-start relative z-10">
        <GlassCard className="w-full max-w-[520px] p-stack-lg md:p-12 rounded-xl shadow-lg">
          <div className="mb-stack-lg">
            <Heading level="h1" size="headline-lg" className="mb-2">
              Master the Art of Japanese
            </Heading>
            <Text variant="body-md" color="on-surface-variant">
              Begin your scholarly journey with elite curriculum and focused study tools.
            </Text>
          </div>

          <SignupForm />
          <SignupBentoCards />
        </GlassCard>
      </div>
    </main>
  );
}
