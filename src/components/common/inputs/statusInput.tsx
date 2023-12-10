import React from 'react';
import { Category, Product } from '@prisma/client';

import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form';
import { Switch } from '@/components/ui/switch';
export function StatusInput({
  form,
  itemData,
}: {
  form: any;
  itemData?: Category | Product;
}) {
  return (
    <FormField
      control={form.control}
      name='isActive'
      render={({ field }) => (
        <FormItem className='flex flex-col'>
          <FormLabel>Is active ?</FormLabel>
          <FormControl>
            <Switch
              checked={
                field.value !== undefined ? field.value : itemData?.isActive
              }
              onCheckedChange={field.onChange}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}