import React from 'react';
import { Category, Product } from '@prisma/client';

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

export function NameInput({
  form,
  itemData,
  target,
  mode,
}: {
  form: any;
  itemData?: Category | Product;
  target: string;
  mode: string;
}) {
  return (
    <FormField
      control={form.control}
      name='name'
      render={({ field }) => (
        <FormItem>
          <FormLabel>Name</FormLabel>
          <FormControl>
            <Input
              placeholder='sport'
              defaultValue={mode === 'edit' ? itemData?.name : ''}
              onChange={field.onChange}
            />
          </FormControl>
          <FormDescription>
            This is the public {target} name that will be display on the shop.
          </FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
