import React from 'react';

interface CardProps {
  className?: string;
  children: React.ReactNode;
}

export function Card({ className = '', children }: CardProps) {
  return (
    <div className={`bg-white rounded-[2rem] border border-outline-variant/30 overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 ${className}`}>
      {children}
    </div>
  );
}

interface GlassCardProps {
  className?: string;
  children: React.ReactNode;
}

export function GlassCard({ className = '', children }: GlassCardProps) {
  return (
    <div className={`glass-card rounded-[2.5rem] shadow-2xl ${className}`}>
      {children}
    </div>
  );
}

interface SectionProps {
  className?: string;
  children: React.ReactNode;
  bgColor?: 'light' | 'dark' | 'primary';
}

export function Section({ className = '', children, bgColor = 'light' }: SectionProps) {
  const bgClasses = {
    light: 'bg-surface',
    dark: 'bg-surface-container-low',
    primary: 'bg-primary',
  };

  return (
    <section className={`py-section-gap relative overflow-hidden ${bgClasses[bgColor]} ${className}`}>
      {children}
    </section>
  );
}

interface ContainerProps {
  className?: string;
  children: React.ReactNode;
}

export function Container({ className = '', children }: ContainerProps) {
  return (
    <div className={`max-w-[1280px] mx-auto px-margin-desktop ${className}`}>
      {children}
    </div>
  );
}

interface BadgeProps {
  variant?: 'primary' | 'secondary' | 'tertiary';
  children: React.ReactNode;
}

export function Badge({ variant = 'primary', children }: BadgeProps) {
  const variants = {
    primary: 'bg-primary/5 border border-primary/10 text-primary',
    secondary: 'bg-secondary/5 border border-secondary/10 text-secondary',
    tertiary: 'bg-tertiary/5 border border-tertiary/10 text-tertiary',
  };

  return (
    <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full ${variants[variant]}`}>
      <span className="w-2 h-2 rounded-full bg-current opacity-60"></span>
      <span className="text-[12px] font-bold tracking-widest uppercase">{children}</span>
    </div>
  );
}

interface StatProps {
  value: string;
  label: string;
}

export function Stat({ value, label }: StatProps) {
  return (
    <div>
      <div className="text-headline-md font-bold text-primary">{value}</div>
      <div className="text-label-md text-on-surface-variant">{label}</div>
    </div>
  );
}

interface AvatarProps {
  src: string;
  alt: string;
  size?: 'sm' | 'md' | 'lg';
}

export function Avatar({ src, alt, size = 'md' }: AvatarProps) {
  const sizes = {
    sm: 'w-12 h-12',
    md: 'w-20 h-20',
    lg: 'w-24 h-24',
  };

  return (
    <img
      alt={alt}
      className={`${sizes[size]} rounded-full object-cover border-4 border-white shadow-xl`}
      src={src}
    />
  );
}

interface IconProps {
  name: string;
  size?: 'sm' | 'md' | 'lg';
  filled?: boolean;
}

export function Icon({ name, size = 'md', filled = false }: IconProps) {
  const sizes = {
    sm: 'text-sm',
    md: 'text-lg',
    lg: 'text-2xl',
  };

  return (
    <span
      className={`material-symbols-outlined ${sizes[size]}`}
      style={{ fontVariationSettings: filled ? "'FILL' 1" : "'FILL' 0" }}
    >
      {name}
    </span>
  );
}
