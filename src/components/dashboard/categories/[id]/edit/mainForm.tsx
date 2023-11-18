'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ReloadIcon } from '@radix-ui/react-icons';

import {
  EditCategoryFormValues,
  editCategoryFormSchema,
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

export function MainCategoryFormEdit({
  id,
  categoryData,
}: {
  id: string;
  categoryData: any;
}) {
  // eslint-disable-next-line no-unused-vars
  const [_isLoading, setIsLoading] = useState<boolean>(false);
  const [isEditingImage, setIsEditingImage] = useState<boolean>(false);

  const router = useRouter();

  const form = useForm<EditCategoryFormValues>({
    resolver: zodResolver(editCategoryFormSchema),
    mode: 'onTouched',
  });

  async function onSubmit(data: EditCategoryFormValues) {
    const formData = new FormData();

    // Check if values have been modified and if values are not the default values then append formData
    if (data.name !== categoryData.res.name && data.name !== undefined) {
      formData.append('name', data.name);
    }

    if (
      data.description !== categoryData.res.description &&
      data.description !== undefined
    ) {
      formData.append('description', data.description);
    }

    if (data.isActive !== undefined) {
      formData.append('isActive', JSON.stringify(data.isActive));
    }

    if (
      data.image &&
      data.image !== categoryData.res.image &&
      data.image !== undefined
    ) {
      formData.append('file', data.image);
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
      setIsLoading(false);
      router.push('http://localhost:3000/dashboard/categories');
    }
  }

  const toggleEditImage = () => {
    setIsEditingImage((prev) => !prev);
  };

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
          name='name'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input
                  placeholder='sport'
                  defaultValue={categoryData.res.name}
                  onChange={field.onChange}
                />
              </FormControl>
              <FormDescription>
                This is the public category name that will be display on the
                shop.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        {!isEditingImage ? (
          <>
            <Image
              src={categoryData && categoryData.res && categoryData.res.image}
              alt='Category Image'
              width={250}
              height={250}
              className='mb-2 h-auto max-w-full'
            />
            <Button type='button' onClick={toggleEditImage}>
              Edit Image
            </Button>
          </>
        ) : (
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
                    type='file'
                    accept='image/*'
                    onChange={(event) =>
                      onChange(event.target.files && event.target.files[0])
                    }
                  />
                </FormControl>
                <FormDescription>
                  Please upload a new image for the category.
                  <br />
                  Please note that the image name will be used to generate the
                  image description and matters for SEO.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

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
                  defaultValue={categoryData.res.description}
                  onChange={field.onChange}
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
                  checked={
                    field.value !== undefined
                      ? field.value
                      : categoryData.res.isActive
                  }
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type='submit' className='bg-[#4d4ab4]'>
          Edit category
        </Button>
      </form>
    </Form>
  );
}
