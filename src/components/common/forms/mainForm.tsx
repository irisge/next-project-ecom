'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
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
import { Button } from '@/components/ui/button';
import { ToastAction } from '@/components/ui/toast';
import {DescriptionInput} from '../inputs/descriptionInput';
import {StatusInput} from '../inputs/statusInput';
import {AddFormatInput} from '../inputs/addFormatInput';
import {TagsInput} from '../inputs/tagsInput';
import { AppendCategory } from '../inputs/appendCategory';
import { NameInput } from '../inputs/nameInput';

import {
  MainCreateProductFormValues,
  mainCreateProductFormSchema,
} from '@/lib/formValidation/formCreateProduct';
import {
  MainCreateCategoryFormValues,
  mainCreateCategoryFormSchema,
} from '@/lib/formValidation/formCreateCategory';

const defaultValues: Partial<MainCreateCategoryFormValues> = {
  name: '',
  image: undefined,
  imageAlt: '',
  description: '',
  isActive: true,
};

export function CreateForm({ target }: { target: string }) {
  const router = useRouter();
  let schema;
  if (target === 'product') {
    schema = mainCreateProductFormSchema;
  } else {
    schema = mainCreateCategoryFormSchema;
  }
  // eslint-disable-next-line no-unused-vars
  const [_isLoading, setIsLoading] = useState<boolean>(false);
  const form = useForm<
    MainCreateCategoryFormValues | MainCreateProductFormValues
  >({
    resolver: zodResolver(schema),
    defaultValues,
    mode: 'all',
  });

  async function onSubmit(
    data: MainCreateCategoryFormValues | MainCreateProductFormValues
  ) {
    const formData = new FormData();
    formData.append('file', data.image);
    formData.append('imageAlt', data.imageAlt);
    formData.append('name', data.name);
    formData.append('description', data.description);
    formData.append('isActive', JSON.stringify(data.isActive));
    if (target === 'product' && 'formats' in data) {
      const formatsArray = data.formats.map((format) => ({
        value: format.value,
        price: format.price && format.price.toString(),
        stock: format.stock && format.stock.toString(),
      }));

      formData.append('formats', JSON.stringify(formatsArray));
    }
    if (target === 'product' && 'tags' in data) {
      formData.append('tags', JSON.stringify(data.tags));
    }
    if (target === 'product' && 'category' in data) {
      formData.append('categories', JSON.stringify(data.category));
    }

    try {
      let url: string;
      if (target === 'category') {
        url = '/api/categories';
      } else {
        url = '/api/products';
      }
      setIsLoading(true);
      const response = await fetch(url, {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        toast({
          title: `${target} created successfully!`,
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
      if (target === 'category') {
        router.push('http://localhost:3000/dashboard/categories');
      } else {
        router.push('http://localhost:3000/dashboard/products');
      }
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
        <NameInput form={form} target={target} mode='create' />
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
                Please note that the image name matters for SEO.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='imageAlt'
          // eslint-disable-next-line no-unused-vars
          render={({ field }) => (
            <FormItem>
              <FormLabel>Image description</FormLabel>
              <FormControl>
                <Input
                  placeholder='a few words describing the image'
                  onChange={field.onChange}
                />
              </FormControl>
              <FormDescription>
                This description will be display in case the image can&apos;t be
                displayed and for accessibility. This impacts SEO.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <DescriptionInput form={form} target={target} />
        <StatusInput form={form} />
        {target === 'product' && (
          <AddFormatInput form={form} target={'product'} />
        )}
        {target === 'product' && <TagsInput form={form} />}
        {target === 'product' && <AppendCategory form={form} />}
        <Button type='submit' className='bg-[#4d4ab4]'>
          Create {target}
        </Button>
      </form>
    </Form>
  );
}
