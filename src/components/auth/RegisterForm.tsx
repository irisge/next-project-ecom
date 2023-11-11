"use client"

import React, { useState } from "react"
import { Form, Formik } from "formik"

import { useRouter } from "next/navigation";
import { signUpSchema } from "@/lib/schemaValidation/signUpSchema";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import Error from "next/error";
import { toast, useToast } from "../ui/use-toast";
import { ToastAction } from "../ui/toast";

interface SignUpFormValues {
    email: string;
    password: string;
    confirmPassword: string;
  }


const RegisterForm:React.FC = () => {
  const { toast } = useToast()

  const router = useRouter()
    return (
    <Formik
      initialValues={{
        email: '',
        password: '',
        confirmPassword: '',
      }}
      validationSchema={signUpSchema}
      onSubmit={async (values: SignUpFormValues, actions) => {
          const response = await fetch('/api/auth/signup', {
              method: 'POST',
              body: JSON.stringify(values),
              headers: {
                  'Content-Type': 'application/json',
              },
          });
      
          if (response.ok) {
              const bearer = response.headers.get('Authorization');
              !!bearer && sessionStorage.setItem('access', bearer);
          } else {
            const errorData = await response.json(); // Parse JSON response
              // Handle non-successful response (e.g., log the error, show a message)
              toast({
                variant: "destructive",
                title: "Something went wrong",
                description: errorData.error,
                action: <ToastAction altText="Try again">Try again</ToastAction>,
              })
          }
        actions.setSubmitting(false);
      }}
    >
        {({ errors, touched, isValid, values, handleBlur, handleChange }) => (
        <Form className="flex flex-col w-full font-sans lg:max-w-lg space-y-6">
            <div>
              <Label htmlFor="email" className="pl-1">
                Email
              </Label>
              <Input
                name="email"
                type="email"
                placeholder="Email address"
                autoComplete="email"
                className="rounded-sm"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
              />
              {errors.email && touched.email ?
                (<div>{errors.email}</div>)
                : null
              }
            </div>
            <div>
              <Label htmlFor="password" className="pl-1">
                Password
              </Label>
              <Input
                name="password"
                type="password"
                placeholder="Password"
                autoComplete="new-password"
                className="rounded-sm"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.password && touched.password ?
                (<div>{errors.password}</div>)
                : null
              }
            </div>
            <div>
              <Label htmlFor="confirmPassword" className="pl-1">
                Confirm password
              </Label>
              <Input
                name="confirmPassword"
                type="password"
                placeholder="Confirm password"
                autoComplete="new-password"
                className="rounded-sm"
                value={values.confirmPassword}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {touched.password !== touched.confirmPassword ?
                (<div>Passwords do not match</div>)
                : null
              }
            </div>      
              <Button
                type="submit"
                disabled={!isValid}
                className="p-6 rounded-xl"
              >
                Sign up
              </Button>

        </Form> )}
    </Formik>
    )
}

export default RegisterForm