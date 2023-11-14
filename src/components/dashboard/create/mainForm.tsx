'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from '@/components/ui/use-toast';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import {
  ProfileFormValues,
  profileFormSchema,
} from '@/lib/formValidation/formCreateCategory';
import { useState } from 'react';
import { Switch } from '@/components/ui/switch';
import { ToastAction } from '@/components/ui/toast';

// This can come from your database or API.
const defaultValues: Partial<ProfileFormValues> = {
  name: '',
  image: undefined,
  description: '',
  isActive: true,
};

export function CategoryForm() {
  // eslint-disable-next-line no-unused-vars
  const [_isLoading, setIsLoading] = useState<boolean>(false);
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues,
    mode: 'all',
  });

  async function onSubmit(data: ProfileFormValues) {
    const formData = new FormData();
    formData.append('file', data.image);
    formData.append('name', data.name);
    formData.append('description', data.description);
    formData.append('isActive', JSON.stringify(data.isActive));
    try {
      setIsLoading(true); // Set loading state to true during the API request
      // Make a POST request to your backend endpoint
      const response = await fetch('/api/categories', {
        method: 'POST',
        body: formData,
        // Add headers if needed, e.g., for authentication or content type
      });

      // Check if the request was successful (status code 2xx)
      if (response.ok) {
        console.log(response);
        // Handle success, e.g., show a success message
        toast({
          title: 'Category created successfully!',
          description: '',
          variant: 'default',
        });
      } else {
        const errorData = await response.json(); // Parse JSON response

        // Handle error, e.g., show an error message
        toast({
          title: 'Oops, something went wrong',
          description: `${errorData.error}`,
          action: <ToastAction altText='Try again'>Try again</ToastAction>,
          variant: 'destructive',
        });
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false); // Reset loading state regardless of success or failure
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
        <FormField
          control={form.control}
          name='name'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder='sport' {...field} />
              </FormControl>
              <FormDescription>
                This is the public category name that will be display on the
                shop.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='image'
          // eslint-disable-next-line no-unused-vars
          render={({ field: { value, onChange, ...fieldProps } }) => (
            <FormItem>
              <FormLabel>Image</FormLabel>
              <FormControl>
                <Input
                  {...fieldProps}
                  placeholder='image'
                  type='file'
                  accept='image/*'
                  onChange={(event) =>
                    onChange(event.target.files && event.target.files[0])
                  }
                />
              </FormControl>
              <FormDescription>
                This is the category image that will be display on the shop.
                <br />
                Please note that the image name will be used to generate the
                image description and matters for SEO.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='description'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder='Tell us a little bit about this category'
                  className='resize'
                  {...field}
                />
              </FormControl>
              <FormDescription>
                This is the public category description that will be display on
                the shop. It will impact your SEO.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='isActive'
          render={({ field }) => (
            <FormItem className='flex flex-col'>
              <FormLabel>Is active ?</FormLabel>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type='submit' className='bg-[#4d4ab4]'>
          Create category
        </Button>
      </form>
    </Form>
  );
}
