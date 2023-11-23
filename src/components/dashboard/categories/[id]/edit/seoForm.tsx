'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { ReloadIcon } from '@radix-ui/react-icons';

import {
  EditCategorySEOFormValues,
  editCategorySEOFormSchema,
} from '@/lib/formValidation/formSEOCategory';

import { Button } from '@/components/ui/button';
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
import { ToastAction } from '@/components/ui/toast';
import { toast } from '@/components/ui/use-toast';

function SeoForm({ id, categoryData }: { id: string; categoryData: any }) {
  const router = useRouter();
  // eslint-disable-next-line no-unused-vars
  const form = useForm<EditCategorySEOFormValues>({
    resolver: zodResolver(editCategorySEOFormSchema),
    mode: 'onTouched',
  });

  async function onSubmit(data: EditCategorySEOFormValues) {
    const formData = new FormData();

    // Check if values have been modified and if values are not the default values then append formData
    if (
      data.metaTitle !== categoryData.res.metaTitle &&
      data.metaTitle !== undefined
    ) {
      formData.append('metaTitle', data.metaTitle);
    }

    if (
      data.keywords !== categoryData.res.keywords &&
      data.keywords !== undefined
    ) {
      formData.append('keywords', data.keywords);
    }

    if (
      data.metaDescription !== categoryData.res.metaDescription &&
      data.metaDescription !== undefined
    ) {
      formData.append('metaDescription', data.metaDescription);
    }

    try {
      const response = await fetch(
        `http://localhost:3000/api/categories/${id}`,
        {
          method: 'PUT', // Assuming you're updating an existing resource
          body: formData,
        }
      );

      if (response.ok) {
        toast({
          title: 'Category updated successfully!',
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
      router.push('http://localhost:3000/dashboard/categories');
      router.refresh();
    }
  }

  if (!categoryData.res) {
    return (
      <Button disabled>
        <ReloadIcon className='mr-2 h-4 w-4 animate-spin' />
        Please wait
      </Button>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
        <FormField
          control={form.control}
          name='metaTitle'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Meta Title</FormLabel>
              <FormControl>
                <Input
                  placeholder='title'
                  defaultValue={categoryData.res.metaTitle}
                  onChange={field.onChange}
                />
              </FormControl>
              <FormDescription>
                This will be use for the meta tag title.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='keywords'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Meta Keywords</FormLabel>
              <FormControl>
                <Input
                  placeholder='keywords'
                  defaultValue={categoryData.res.keywords}
                  onChange={field.onChange}
                />
              </FormControl>
              <FormDescription>
                This will be use for the meta tag keywords.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='metaDescription'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Meta Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder='Tell us a little bit about this category'
                  defaultValue={categoryData.res.metaDescription}
                  className='resize'
                  onChange={field.onChange}
                />
              </FormControl>
              <FormDescription>
                This will be use for the meta tag description. It is the most
                impactful SEO tag.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type='submit' className='bg-[#4d4ab4]'>
          Add these SEO tags to your category
        </Button>
      </form>
    </Form>
  );
}

export default SeoForm;
