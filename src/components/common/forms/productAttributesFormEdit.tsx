import Icon from '@/components/iconComponent';
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
import { ToastAction } from '@/components/ui/toast';
import { toast } from '@/components/ui/use-toast';
import {
  editProductAttributesFormValues,
  editProductAttributesSchema,
} from '@/lib/formValidation/formProductAttributes';
import { Product } from '@/lib/types/interfaces';
import { zodResolver } from '@hookform/resolvers/zod';
import { ReloadIcon } from '@radix-ui/react-icons';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { EditProductAttributes } from '../dialogs/editProductAttributes';
import { DeleteProductAttributes } from '../dialogs/deleteProductAttributes';
import clsx from 'clsx';

export const ProductAttributesFormEdit = ({
  itemData,
  id,
}: {
  itemData: Product;
  id: string;
}) => {
  const [formatId, setFormatId] = useState<string>();
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [isDialogDeleteOpen, setIsDialogDeleteOpen] = useState<boolean>(false);
  const [isFormNewAttributesRevealed, setIsFormNewAttributesRevealed] =
    useState<boolean>(false);
  const router = useRouter();
  const form = useForm<editProductAttributesFormValues>({
    resolver: zodResolver(editProductAttributesSchema),
    mode: 'all',
  });

  if (!itemData) {
    return (
      <Button disabled>
        <ReloadIcon className='mr-2 h-4 w-4 animate-spin' />
        Please wait
      </Button>
    );
  }

  async function onSubmit(data: editProductAttributesFormValues) {
    try {
      const url: string = `http://localhost:3000/api/products/${id}/formats`;

      const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(data),
      });

      if (response.ok) {
        toast({
          title: `Product attributes added successfully!`,
          description: '',
          variant: 'default',
        });
        setIsFormNewAttributesRevealed(!isFormNewAttributesRevealed);
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
    <>
      {itemData && (
        <div>
          <table className='w-full table-auto rounded-md'>
            <thead className=''>
              <tr className='grid grid-cols-4 place-items-start rounded-t-md bg-muted px-2 py-2 font-medium'>
                <th>Format</th>
                <th>Stock</th>
                <th>Price</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {itemData.format.map((item) => (
                <tr
                  key={item.id}
                  className='border-muter grid border-collapse grid-cols-4 border-x border-b p-2'
                >
                  <td>{item.formatName}</td>
                  <td>{item.quantityStock}</td>
                  <td>{Number(item.price).toFixed(2)} €</td>
                  <td
                    style={{ color: 'hsl(var(--muted-foreground))' }}
                    className='flex w-full justify-evenly'
                  >
                    <Icon
                      id={item.id}
                      name='pencil'
                      className='h-5 w-5'
                      onClick={async (e: React.MouseEvent<SVGGElement>) => {
                        setFormatId(e.currentTarget.id);
                        setIsDialogOpen(true);
                      }}
                    />
                    <Icon
                      id={item.id}
                      name='trash-2'
                      className='h-5 w-5'
                      color='#CC3333'
                      onClick={async (e: React.MouseEvent<SVGGElement>) => {
                        setFormatId(e.currentTarget.id);
                        setIsDialogDeleteOpen(true);
                      }}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <Button
            className={clsx(
              isFormNewAttributesRevealed ? ' invisible ' : ' visible ',
              ' mt-10 bg-[#4d4ab4]'
            )}
            onClick={() => {
              setIsFormNewAttributesRevealed(!isFormNewAttributesRevealed);
            }}
          >
            Add a new format and product attributes
          </Button>
          {isDialogOpen && (
            <EditProductAttributes
              isDialogOpen={isDialogOpen}
              setIsDialogOpen={setIsDialogOpen}
              formatId={formatId}
              itemData={itemData}
              id={id}
            />
          )}
          <DeleteProductAttributes
            isDialogDeleteOpen={isDialogDeleteOpen}
            setIsDialogDeleteOpen={setIsDialogDeleteOpen}
            id={id}
            formatId={formatId}
          />
          <div
            className={clsx(
              isFormNewAttributesRevealed ? ' visible ' : ' invisible '
            )}
          >
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className='flex flex-col space-y-8 duration-300 ease-in'
              >
                <FormField
                  control={form.control}
                  name={`formatName`}
                  render={({ field }) => (
                    <FormItem className='max-w-[70%]'>
                      <FormLabel>Format</FormLabel>
                      <FormDescription>
                        Add format available for this product.
                      </FormDescription>
                      <FormControl>
                        <Input
                          placeholder='10x15 cm'
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
                        Add stock available for this product.
                      </FormDescription>
                      <FormControl>
                        <Input
                          placeholder='0'
                          type='number'
                          step={1}
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
                        Add price for this product.
                      </FormDescription>
                      <FormControl>
                        <Input
                          placeholder='0.00'
                          type='number'
                          step={0.01}
                          onChange={field.onChange}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className='flex w-full max-w-[70%] justify-end space-x-6'>
                  <Button
                    variant='outline'
                    type='reset'
                    onClick={() => {
                      setIsFormNewAttributesRevealed(
                        !isFormNewAttributesRevealed
                      );
                    }}
                  >
                    Cancel
                  </Button>
                  <Button
                    variant='default'
                    className='bg-[#4d4ab4]'
                    type='submit'
                  >
                    Confirm
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </div>
      )}
    </>
  );
};
