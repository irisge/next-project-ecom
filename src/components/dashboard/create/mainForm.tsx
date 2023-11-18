'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';

import {
  MainCreateCategoryFormValues,
  mainCreateCategoryFormSchema,
} from '@/lib/formValidation/formCreateCategory';

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
import { Switch } from '@/components/ui/switch';
import { ToastAction } from '@/components/ui/toast';

const defaultValues: Partial<MainCreateCategoryFormValues> = {
  name: '',
  image: undefined,
  description: '',
  isActive: true,
};

export function CategoryForm() {
  const router = useRouter();
  // eslint-disable-next-line no-unused-vars
  const [_isLoading, setIsLoading] = useState<boolean>(false);
  const form = useForm<MainCreateCategoryFormValues>({
    resolver: zodResolver(mainCreateCategoryFormSchema),
    defaultValues,
    mode: 'all',
  });

  async function onSubmit(data: MainCreateCategoryFormValues) {
    const formData = new FormData();
    formData.append('file', data.image);
    formData.append('name', data.name);
    formData.append('description', data.description);
    formData.append('isActive', JSON.stringify(data.isActive));
    try {
      setIsLoading(true);
      const response = await fetch('/api/categories', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        toast({
          title: 'Category created successfully!',
          description: '',
          variant: 'default',
        });
      } else {
        const errorData = await response.json();

        toast({
          title: 'Oops, something went wrong',
          description: `${errorData.error}`,
          action: <ToastAction altText='Try again'>Try again</ToastAction>,
          variant: 'destructive',
        });
      }
    } catch (error: any) {
      throw new Error(error);
    } finally {
      setIsLoading(false);
      router.push('http://localhost:3000/dashboard/categories');
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
