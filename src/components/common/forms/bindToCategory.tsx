import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Form, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { MultiSelect } from '@/components/ui/multi-select';
import { ToastAction } from '@/components/ui/toast';
import { toast } from '@/components/ui/use-toast';
import {
  EditCategoryFormValues,
  editCategoryFormSchema,
} from '@/lib/formValidation/formCreateCategory';
import {
  EditProductFormValues,
  editProductFormSchema,
} from '@/lib/formValidation/formCreateProduct';
import { Category, Product } from '@prisma/client';
import { Product as ProductWithCateg } from '@/lib/types/interfaces';
import { zodResolver } from '@hookform/resolvers/zod';
import { ReloadIcon } from '@radix-ui/react-icons';
import { X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
export function BindToCategory({
  itemData,
  target,
  id,
}: {
  itemData: Product;
  target: string;
  id: string;
}) {
  const router = useRouter();
  const [categories, setCategories] = useState<
    Record<'value' | 'label', string>[]
  >([]);
  useEffect(() => {
    fetch('http://localhost:3000/api/categories')
      .then((res) => res.json())
      .then((data) =>
        setCategories(
          data.getAllCategories.map((category: Category) => ({
            label: category.name,
            value: category.id.toString(),
          }))
        )
      );
  }, []);
  let schema;
  if (target === 'product') {
    schema = editProductFormSchema;
  } else {
    schema = editCategoryFormSchema;
  }

  const form = useForm<EditProductFormValues | EditCategoryFormValues>({
    resolver: zodResolver(schema),
    mode: 'onTouched',
  });
  async function onSubmit(
    data: EditCategoryFormValues | EditProductFormValues
  ) {
    const formData = new FormData();
    if (target === 'product' && 'category' in data) {
      formData.append('categories', JSON.stringify(data.category));
    }

    try {
      let url: string;
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
      // router.push('http://localhost:3000/dashboard/categories');
      form.reset();
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
  console.log(form.formState.errors);

  const handleDelete = async ({
    categoryId,
    productId,
  }: {
    categoryId: string;
    productId: string;
  }) => {
    try {
      let url: string;
      if (target === 'category')
        url = `http://localhost:3000/api/categories/${categoryId}/products/${productId}`;
      else {
        url = `http://localhost:3000/api/products/${productId}/categories/${categoryId}`;
      }

      const response = await fetch(url, {
        method: 'DELETE',
      });

      if (response.ok) {
        return await response.json();
      } else {
        const errorData = await response.json();
        throw new Error(errorData);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      router.refresh();
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
        <div className='flex w-full flex-col space-y-2'>
          <h3>Categories related to this product:</h3>
          <div className='flex w-full space-x-4'>
            {(itemData as unknown as ProductWithCateg).categories.map(
              (categ) => (
                <Badge
                  key={categ.categoryId}
                  variant={'secondary'}
                  className='flex w-max rounded-md px-4 py-2'
                >
                  {categ.category.name}
                  <X
                    className='h-4 w-4'
                    onClick={() =>
                      handleDelete({
                        categoryId: categ.categoryId,
                        productId: id,
                      })
                    }
                  />
                </Badge>
              )
            )}
          </div>
        </div>
        <FormField
          control={form.control}
          name='category'
          render={({ field: { ...field } }) => (
            <FormItem className='mb-5'>
              <FormLabel>Add this product to a new category</FormLabel>
              <MultiSelect
                selected={field.value || []}
                options={categories || []}
                {...field}
              />
            </FormItem>
          )}
        />
        <Button type='submit' className='bg-[#4d4ab4]'>
          Update {target}
        </Button>
      </form>
    </Form>
  );
}
