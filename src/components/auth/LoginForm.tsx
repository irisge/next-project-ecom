'use client';

import React from 'react';
import { Form, Formik } from 'formik';

import { useRouter } from 'next/navigation';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { loginSchema } from '@/lib/schemaValidation/loginSchema';
import { toast } from '../ui/use-toast';
import { ToastAction } from '../ui/toast';

interface SignInFormValues {
  email: string;
  password: string;
}

const LoginForm: React.FC = () => {
  const router = useRouter();
  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
      }}
      validationSchema={loginSchema}
      onSubmit={async (values: SignInFormValues, actions) => {
        const response = await fetch('/api/auth/signin', {
          method: 'POST',
          body: JSON.stringify(values),
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const bearer = response.headers.get('Authorization');
          !!bearer && sessionStorage.setItem('access', bearer);
          router.push('/');
        } else {
          const errorData = await response.json(); 
          toast({
            variant: 'destructive',
            title: 'Something went wrong',
            description: errorData.error,
            action: <ToastAction altText='Try again'>Try again</ToastAction>,
          });
        }
        actions.setSubmitting(false);
      }}
    >
      {({ errors, touched, isValid, values, handleBlur, handleChange }) => (
        <Form className='flex w-full flex-col space-y-6 font-sans lg:max-w-lg'>
          <div>
            <Label htmlFor='email' className='pl-1'>
              Email
            </Label>
            <Input
              name='email'
              type='email'
              placeholder='Email address'
              autoComplete='email'
              className='rounded-sm'
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.email}
            />
            {errors.email && touched.email ? <div>{errors.email}</div> : null}
          </div>
          <div>
            <Label htmlFor='password' className='pl-1'>
              Password
            </Label>
            <Input
              name='password'
              type='password'
              placeholder='Password'
              autoComplete='new-password'
              className='rounded-sm'
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.password && touched.password ? (
              <div>{errors.password}</div>
            ) : null}
          </div>
          <Button type='submit' disabled={!isValid} className='rounded-xl p-6'>
            Sign in
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default LoginForm;
