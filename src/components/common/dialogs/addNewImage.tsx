import React from 'react';
import { useRouter } from 'next/navigation';
import {
  Dialog,
  DialogTrigger,
  DialogHeader,
  DialogTitle,
  DialogClose,
  DialogContent,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
  FormField,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  EditCategoryFormValues,
  editCategoryFormSchema,
} from '@/lib/formValidation/formCreateCategory';
import {
  EditProductFormValues,
  editProductFormSchema,
} from '@/lib/formValidation/formCreateProduct';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from '@/components/ui/use-toast';
import { ToastAction } from '@/components/ui/toast';

export function AddNewImage({ target, id }: { target: string; id: string }) {
  const router = useRouter();
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

  console.log(form.formState.errors);
  async function onSubmit(
    data: EditCategoryFormValues | EditProductFormValues
  ) {
    const formData = new FormData();
    if (data.image && data.image !== undefined) {
      formData.append('file', data.image);
      if (data.imageDescription !== undefined) {
        formData.append('fileDescription', data.imageDescription);
      }
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
      router.refresh();
    }
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className='flex w-min whitespace-nowrap bg-transparent text-muted-foreground hover:bg-muted '>
          Add a new image
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Upload your new image</DialogTitle>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
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
                      Please note that the image name will be used to generate
                      the image description and matters for SEO.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='imageDescription'
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
                      In case your image can&apos;t load, this is the
                      descriptive text that will appear instead of your image.
                      This is also used for accessibility. Describe your image
                      with a few words.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogClose asChild>
                <Button
                  type='submit'
                  variant='secondary'
                  className='space-x-4 place-self-end'
                >
                  Save
                </Button>
              </DialogClose>
            </form>
          </Form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
