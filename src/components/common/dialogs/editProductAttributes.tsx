import React, { SetStateAction } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
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
import { useForm } from 'react-hook-form';
import {
  editProductAttributesFormValues,
  editProductAttributesSchema,
} from '@/lib/formValidation/formProductAttributes';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from '@/components/ui/use-toast';
import { ToastAction } from '@/components/ui/toast';
import { useRouter } from 'next/navigation';
import { Product } from '@/lib/types/interfaces';
export const EditProductAttributes = ({
  isDialogOpen,
  setIsDialogOpen,
  formatId,
  itemData,
  id,
}: {
  isDialogOpen: boolean;
  setIsDialogOpen: React.Dispatch<SetStateAction<boolean>>;
  formatId: string | undefined;
  itemData: Product;
  id: string;
}) => {
  const router = useRouter();
  const form = useForm<editProductAttributesFormValues>({
    resolver: zodResolver(editProductAttributesSchema),
    mode: 'all',
  });
  async function onSubmit(data: editProductAttributesFormValues) {
    try {
      const url: string = `http://localhost:3000/api/products/${id}/formats/${formatId}`;

      const response = await fetch(url, {
        method: 'PUT',
        body: JSON.stringify(data),
      });

      if (response.ok) {
        toast({
          title: `Product attributes edited successfully!`,
          description: '',
          variant: 'default',
        });
        setIsDialogOpen(!isDialogOpen);
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

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit product attributes</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
            <FormField
              control={form.control}
              name={`formatName`}
              render={({ field }) => (
                <FormItem className='max-w-[70%]'>
                  <FormLabel>Format</FormLabel>
                  <FormDescription>
                    Edit format available for this product.
                  </FormDescription>
                  <FormControl>
                    <Input
                      placeholder='10x15 cm'
                      defaultValue={
                        itemData.format.filter(
                          (item) => item.id === formatId
                        )[0].formatName
                      }
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name={`quantityStock`}
              render={({ field }) => (
                <FormItem className='max-w-[70%]'>
                  <FormLabel>Stock</FormLabel>
                  <FormDescription>
                    Edit stock available for this product format.
                  </FormDescription>
                  <FormControl>
                    <Input
                      placeholder='0'
                      type='number'
                      step={1}
                      defaultValue={
                        itemData.format.filter(
                          (item) => item.id === formatId
                        )[0].quantityStock
                      }
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name={`price`}
              render={({ field }) => (
                <FormItem className='max-w-[70%]'>
                  <FormLabel>Price</FormLabel>
                  <FormDescription>
                    Edit price for this product format.
                  </FormDescription>
                  <FormControl>
                    <Input
                      placeholder='0.00'
                      type='number'
                      step={0.01}
                      defaultValue={itemData.format
                        .filter((item) => item.id === formatId)[0]
                        .price.toFixed(2)}
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className='space-x-4 place-self-end'>
              <Button
                type='button'
                variant='secondary'
                onClick={() => {
                  setIsDialogOpen(false);
                }}
              >
                Close
              </Button>
              <Button variant='destructive' type='submit'>
                Confirm
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
