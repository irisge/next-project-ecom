'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { ReloadIcon } from '@radix-ui/react-icons';

import {
  EditSEOFormValues,
  editSEOFormSchema,
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
import { TagsInput } from '../inputs/tagsInput';
import { Category, Product } from '@prisma/client';

function SeoForm({
  id,
  itemData,
  target,
}: {
  id: string;
  itemData: Category | Product;
  target: string;
}) {
  const router = useRouter();
  // eslint-disable-next-line no-unused-vars
  const form = useForm<EditSEOFormValues>({
    resolver: zodResolver(editSEOFormSchema),
    mode: 'onTouched',
  });

  async function onSubmit(data: EditSEOFormValues) {
    const formData = new FormData();

    // Check if values have been modified and if values are not the default values then append formData
    if (data.metaTitle !== itemData.metaTitle && data.metaTitle !== undefined) {
      formData.append('metaTitle', data.metaTitle);
    }

    if (data.keywords !== itemData.keywords && data.keywords !== undefined) {
      formData.append('keywords', data.keywords);
    }

    if (
      data.metaDescription !== itemData.metaDescription &&
      data.metaDescription !== undefined
    ) {
      formData.append('metaDescription', data.metaDescription);
    }

    try {
      let url: string;
      if (target === 'product') {
        url = `http://localhost:3000/api/products/${id}`;
      } else {
        url = `http://localhost:3000/api/categories/${id}`;
      }
      const response = await fetch(url, {
        method: 'PUT', // Assuming you're updating an existing resource
        body: formData,
      });

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
      router.refresh();
    }
  }

  if (!itemData) {
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
                  defaultValue={itemData.metaTitle || ''}
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
                  defaultValue={itemData.keywords || ''}
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
                  defaultValue={itemData.metaDescription || ''}
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
        {target === 'product' && itemData && (
          <TagsInput form={form} itemData={itemData as Product} />
        )}

        <Button type='submit' className='bg-[#4d4ab4]'>
          Update these SEO settings for this {target}
        </Button>
      </form>
    </Form>
  );
}

export default SeoForm;
