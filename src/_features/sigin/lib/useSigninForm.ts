import { useForm } from '@mantine/form';
import { zod4Resolver } from 'mantine-form-zod-resolver';
import { z } from 'zod';
import { ISigninFormValues } from '../types';

const formScheme = z.object({
  email: z.email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters long'),
});

export const useSigninForm = () => {
  const form = useForm<ISigninFormValues>({
    initialValues: {
      email: '',
      password: '',
    },
    validate: zod4Resolver(formScheme),
    validateInputOnBlur: true,
  });

  return {
    form,
    values: form.values,
    isValid: form.isValid(),
    reset: form.reset,
    setFieldValue: form.setFieldValue,
  };
};