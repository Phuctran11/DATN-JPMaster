import React from 'react';

interface HeadingProps {
  level: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  size?: 'display-lg' | 'headline-lg' | 'headline-md' | 'headline-sm';
  children: React.ReactNode;
  className?: string;
}

export function Heading({ level, size, children, className = '' }: HeadingProps) {
  const sizeClasses = {
    'display-lg': 'font-display-lg text-display-lg',
    'headline-lg': 'font-headline-lg text-headline-lg',
    'headline-md': 'font-headline-md text-headline-md',
    'headline-sm': 'font-headline-sm text-headline-sm',
  };

  const Component = level;
  return (
    <Component className={`text-primary ${sizeClasses[size || 'headline-lg']} ${className}`}>
      {children}
    </Component>
  );
}

interface TextProps {
  variant?: 'body-lg' | 'body-md' | 'label-md';
  color?: 'primary' | 'on-surface' | 'on-surface-variant' | 'white';
  children: React.ReactNode;
  className?: string;
}

export function Text({ variant = 'body-md', color = 'on-surface', children, className = '' }: TextProps) {
  const variantClasses = {
    'body-lg': 'font-body-lg text-body-lg',
    'body-md': 'font-body-md text-body-md',
    'label-md': 'font-label-md text-label-md',
  };

  const colorClasses = {
    primary: 'text-primary',
    'on-surface': 'text-on-surface',
    'on-surface-variant': 'text-on-surface-variant',
    white: 'text-white',
  };

  return (
    <p className={`${variantClasses[variant]} ${colorClasses[color]} ${className}`}>
      {children}
    </p>
  );
}
