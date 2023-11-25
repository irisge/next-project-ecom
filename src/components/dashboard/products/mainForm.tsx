'use client';

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';

import {
  MainCreateProductFormValues,
  mainCreateProductFormSchema,
} from '@/lib/formValidation/formCreateProduct';

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
import { Tag, TagInput } from '@/components/ui/tag-input';
import { MultiSelect } from '@/components/ui/multi-select';
import { Category } from '@/lib/types/interfaces';

const defaultValues: Partial<MainCreateProductFormValues> = {
  name: '',
  image: undefined,
  description: '',
  stock: 0,
  isActive: true,
};

export function ProductForm() {
  const router = useRouter();
  // eslint-disable-next-line no-unused-vars
  const [_isLoading, setIsLoading] = useState<boolean>(false);
  const [tags, setTags] = useState<Tag[]>([]);
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

  const form = useForm<MainCreateProductFormValues>({
    resolver: zodResolver(mainCreateProductFormSchema),
    defaultValues,
    mode: 'all',
  });

  const { setValue } = form;

  async function onSubmit(data: MainCreateProductFormValues) {
    const formData = new FormData();
    formData.append('file', data.image);
    formData.append('name', data.name);
    formData.append('imageAlt', data.imageAlt);
    formData.append('description', data.description);
    formData.append('price', JSON.stringify(data.price));
    formData.append('stock', JSON.stringify(data.stock));
    formData.append('tags', JSON.stringify(data.tags));
    formData.append('isActive', JSON.stringify(data.isActive));
    formData.append('categories', JSON.stringify(data.category));
    try {
      console.log(data);
      setIsLoading(true);
      const response = await fetch('/api/products', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        toast({
          title: 'Product created successfully!',
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
      router.push('http://localhost:3000/dashboard/products');
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
                This is the public product name that will be display on the
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
                This is the product image that will be display on the shop.
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
          name='imageAlt'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Image Description</FormLabel>
              <FormControl>
                <Input
                  placeholder='a racer in competition ready for the start'
                  onChange={field.onChange}
                />
              </FormControl>
              <FormDescription>
                In case your image can&apos;t load, this is the descriptive text
                that will appear instead of your image. This is also used for
                accessibility. Describe your image with a few words.
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
                  placeholder='Tell us a little bit about this product'
                  className='resize'
                  {...field}
                />
              </FormControl>
              <FormDescription>
                This is the public product description that will be display on
                the shop. It will impact your SEO.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='price'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Price</FormLabel>
              <FormControl>
                <Input
                  placeholder='0.00'
                  type='number'
                  step='0.01'
                  onChange={field.onChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='stock'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Stock</FormLabel>
              <FormControl>
                <Input
                  placeholder='0'
                  type='number'
                  step='1'
                  onChange={field.onChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='tags'
          render={({ field }) => (
            <FormItem className='flex flex-col items-start'>
              <FormLabel className='text-left'>Tags</FormLabel>
              <FormControl>
                <TagInput
                  {...field}
                  placeholder='Enter a topic'
                  tags={tags}
                  className='sm:min-w-[450px]'
                  setTags={(newTags) => {
                    setTags(newTags);
                    setValue(
                      'tags',
                      (newTags as Tag[]).map((tag) => tag.text) as string[]
                    );
                  }}
                  value={tags.map((tag) => tag.text)}
                  onChange={field.onChange}
                />
              </FormControl>
              <FormDescription>
                These are the topics that you&apos;re interested in.
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
        <FormField
          control={form.control}
          name='category'
          render={({ field: { ...field } }) => (
            <FormItem className='mb-5'>
              <FormLabel>Category</FormLabel>
              <MultiSelect
                selected={field.value || []}
                options={categories || []}
                {...field}
              />
            </FormItem>
          )}
        />
        <Button type='submit' className='bg-[#4d4ab4]'>
          Create product
        </Button>
      </form>
    </Form>
  );
}
