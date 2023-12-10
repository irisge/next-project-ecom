// 'use client';
import React from 'react';
import { Form, Formik } from 'formik';

import { useRouter } from 'next/navigation';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { useToast } from '../ui/use-toast';
import { ToastAction } from '../ui/toast';

interface AuthFormProps {
  validationSchema: any; // Replace 'any' with the actual type of your validation schema
  submitUrl: string;
  submitText: string;
}

const AuthForm: React.FC<AuthFormProps> = ({
  validationSchema,
  submitUrl,
  submitText,
}) => {
  const { toast } = useToast();
  const router = useRouter();

  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
        confirmPassword: '',
      }}
      validationSchema={validationSchema}
      onSubmit={async (values, actions) => {
        const response = await fetch(submitUrl, {
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
          {submitUrl === '/api/auth/signup' && (
            <div>
              <Label htmlFor='confirmPassword' className='pl-1'>
                Confirm password
              </Label>
              <Input
                name='confirmPassword'
                type='password'
                placeholder='Confirm password'
                autoComplete='new-password'
                className='rounded-sm'
                value={values.confirmPassword}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {touched.password !== touched.confirmPassword ? (
                <div>Passwords do not match</div>
              ) : null}
            </div>
          )}
          <Button type='submit' disabled={!isValid} className='rounded-xl p-6'>
            {submitText}
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default AuthForm;
