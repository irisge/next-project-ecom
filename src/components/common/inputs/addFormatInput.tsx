import React from 'react';
import { useFieldArray } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

import { cn } from '@/lib/utils';

export function AddFormatInput({ form, target }: { form: any; target: string }) {
  const { fields, append } = useFieldArray({
    name: 'formats',
    control: form.control,
  });

  return (
    <>
      {target === 'product' && (
        <div>
          {fields.map((field, index) => (
            <div key={field.id} className='flex w-full justify-between'>
              <FormField
                control={form.control}
                name={`formats.${index}.value`}
                render={({ field }) => (
                  <FormItem className='max-w-[70%]'>
                    <FormLabel className={cn(index !== 0 && 'sr-only')}>
                      Format
                    </FormLabel>
                    <FormDescription className={cn(index !== 0 && 'sr-only')}>
                      Add formats availables for this product.
                    </FormDescription>
                    <FormControl>
                      <Input placeholder='10x15 cm' onChange={field.onChange} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`formats.${index}.price`}
                render={({ field }) => (
                  <FormItem className='max-w-[50%]'>
                    <FormLabel className={cn(index !== 0 && 'sr-only')}>
                      Price
                    </FormLabel>
                    <FormDescription className={cn(index !== 0 && 'sr-only')}>
                      Add the price for this format.
                    </FormDescription>
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
                name={`formats.${index}.stock`}
                render={({ field }) => (
                  <FormItem className='max-w-[50%]'>
                    <FormLabel className={cn(index !== 0 && 'sr-only')}>
                      Stock
                    </FormLabel>
                    <FormDescription className={cn(index !== 0 && 'sr-only')}>
                      Add the stock available for this format.
                    </FormDescription>
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
            </div>
          ))}
          <Button
            type='button'
            variant='outline'
            size='sm'
            className='mt-2'
            onClick={() => append({ value: '', price: '', stock: '' })}
          >
            Add Format and Price
          </Button>
        </div>
      )}
    </>
  );
}