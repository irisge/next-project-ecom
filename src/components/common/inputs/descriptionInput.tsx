import React from 'react';
import { Category, Product } from '@prisma/client';

import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';

export function DescriptionInput({
  form,
  itemData,
  target,
}: {
  form: any;
  itemData?: Category | Product;
  target: string;
}) {
  return (
    <FormField
      control={form.control}
      name='description'
      render={({ field }) => (
        <FormItem>
          <FormLabel>Description</FormLabel>
          <FormControl>
            <Textarea
              placeholder={`Tell us a little bit about this ${target}`}
              className='resize'
              defaultValue={itemData?.description ? itemData.description : ''}
              onChange={field.onChange}
            />
          </FormControl>
          <FormDescription>
            This is the public {target} description that will be display on the
            shop. It will impact your SEO.
          </FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}