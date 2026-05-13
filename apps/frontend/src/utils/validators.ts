export const validators = {
  email: (value: string): string => {
    if (!value) return 'Email is required';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Invalid email format';
    return '';
  },

  password: (value: string, minLength = 6): string => {
    if (!value) return 'Password is required';
    if (value.length < minLength) return `Password must be at least ${minLength} characters`;
    return '';
  },

  name: (value: string): string => {
    if (!value.trim()) return 'Full name is required';
    return '';
  },

  confirmPassword: (password: string, confirmPassword: string): string => {
    if (!confirmPassword) return 'Please confirm your password';
    if (password !== confirmPassword) return 'Passwords do not match';
    return '';
  },
};

export type ValidationField = keyof typeof validators;
