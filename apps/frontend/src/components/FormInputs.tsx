import React, { useState } from 'react';
import { Icon } from './ui';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export function Input({ label, error, className = '', ...props }: InputProps) {
  return (
    <div className="space-y-stack-sm">
      {label && (
        <label className="font-label-md text-label-md text-on-surface-variant block" htmlFor={props.id}>
          {label}
        </label>
      )}
      <input
        className={`w-full p-4 bg-surface-container-lowest border border-outline-variant rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all placeholder:text-outline-variant disabled:opacity-50 disabled:cursor-not-allowed ${error ? 'border-error' : ''} ${className}`}
        {...props}
      />
      {error && (
        <p className="text-error text-sm font-medium">{error}</p>
      )}
    </div>
  );
}

interface PasswordInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export function PasswordInput({ label, error, className = '', ...props }: PasswordInputProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="space-y-stack-sm">
      {label && (
        <label className="font-label-md text-label-md text-on-surface-variant block" htmlFor={props.id}>
          {label}
        </label>
      )}
      <div className="relative">
        <input
          type={showPassword ? 'text' : 'password'}
          className={`w-full p-4 pr-12 bg-surface-container-lowest border border-outline-variant rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all placeholder:text-outline-variant disabled:opacity-50 disabled:cursor-not-allowed ${error ? 'border-error' : ''} ${className}`}
          {...props}
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-on-surface transition-colors"
          disabled={props.disabled}
        >
          <Icon name={showPassword ? 'visibility_off' : 'visibility'} size="md" />
        </button>
      </div>
      {error && (
        <p className="text-error text-sm font-medium">{error}</p>
      )}
    </div>
  );
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: Array<{ value: string; label: string }>;
}

export function Select({ label, options, className = '', ...props }: SelectProps) {
  return (
    <div className="space-y-stack-sm">
      {label && (
        <label className="font-label-md text-label-md text-on-surface block" htmlFor={props.id}>
          {label}
        </label>
      )}
      <div className="relative">
        <select
          className={`w-full px-4 py-3 bg-surface border border-outline-variant rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all outline-none appearance-none disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
          {...props}
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <span className="material-symbols-outlined absolute right-3 top-3.5 pointer-events-none text-on-surface-variant">
          expand_more
        </span>
      </div>
    </div>
  );
}

