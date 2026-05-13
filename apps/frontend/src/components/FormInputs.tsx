import React from 'react';

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
        className={`w-full p-4 bg-surface-container-lowest border border-outline-variant rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all placeholder:text-outline-variant ${error ? 'border-error' : ''} ${className}`}
        {...props}
      />
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
          className={`w-full px-4 py-3 bg-surface border border-outline-variant rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all outline-none appearance-none ${className}`}
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
