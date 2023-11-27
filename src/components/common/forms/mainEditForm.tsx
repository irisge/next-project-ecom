'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ReloadIcon } from '@radix-ui/react-icons';

import {
  EditCategoryFormValues,
  editCategoryFormSchema,
} from '@/lib/formValidation/formCreateCategory';

import { toast } from '@/components/ui/use-toast';
import { Form } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { ToastAction } from '@/components/ui/toast';
import { NameInput } from '@/components/common/inputs/nameInput';
import { DescriptionInput } from '@/components/common/inputs/descriptionInput';
import { StatusInput } from '@/components/common/inputs/statusInput';
import {
  EditProductFormValues,
  editProductFormSchema,
} from '@/lib/formValidation/formCreateProduct';
import { Category, Product } from '@prisma/client';

export function MainCategoryFormEdit({
  id,
  itemData,
  target,
}: {
  id: string;
  itemData: Category | Product;
  target: string;
}) {
  // eslint-disable-next-line no-unused-vars
  const [_isLoading, setIsLoading] = useState<boolean>(false);

  const router = useRouter();

  let schema;
  if (target === 'product') {
    schema = editProductFormSchema;
  } else {
    schema = editCategoryFormSchema;
  }

  const form = useForm<EditProductFormValues | EditCategoryFormValues>({
    resolver: zodResolver(schema),
    mode: 'all',
  });

  async function onSubmit(
    data: EditCategoryFormValues | EditProductFormValues
  ) {
    const formData = new FormData();

    // Check if values have been modified and if values are not the default values then append formData
    if (data.name !== itemData.name && data.name !== undefined) {
      formData.append('name', data.name);
    }

    if (
      data.description !== itemData.description &&
      data.description !== undefined
    ) {
      formData.append('description', data.description);
    }

    if (data.isActive !== undefined) {
      formData.append('isActive', JSON.stringify(data.isActive));
    }

    try {
      let url;
      if (target === 'category') {
        url = `http://localhost:3000/api/categories/${id}`;
      } else {
        url = `http://localhost:3000/api/products/${id}`;
      }
      const response = await fetch(url, {
        method: 'PUT',
        body: formData,
      });

      if (response.ok) {
        toast({
          title: `${target} updated successfully!`,
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
        <NameInput
          form={form}
          itemData={itemData}
          target={target}
          mode='edit'
        />
        <DescriptionInput form={form} itemData={itemData} target={target} />
        <StatusInput form={form} itemData={itemData} />
        <Button
          type='submit'
          className='bg-[#4d4ab4]'
          onClick={form.handleSubmit(onSubmit)}
        >
          Edit {target}
        </Button>
      </form>
    </Form>
  );
}
