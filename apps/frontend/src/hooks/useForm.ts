import { useState } from 'react';

interface UseFormOptions {
  initialValues: Record<string, string>;
  onValidate: (values: Record<string, string>) => Record<string, string>;
}

export function useForm({ initialValues, onValidate }: UseFormOptions) {
  const [formData, setFormData] = useState(initialValues);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
    if (errors[id]) {
      setErrors((prev) => ({ ...prev, [id]: '' }));
    }
  };

  const validate = () => {
    const newErrors = onValidate(formData);
    setErrors(newErrors);
    return Object.values(newErrors).every((error) => !error);
  };

  const reset = () => {
    setFormData(initialValues);
    setErrors({});
  };

  return {
    formData,
    errors,
    handleChange,
    validate,
    reset,
  };
}
