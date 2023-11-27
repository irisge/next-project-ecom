import React, { useEffect, useState } from 'react';
import { Category } from '@prisma/client';

import { FormField, FormItem, FormLabel } from '@/components/ui/form';
import { MultiSelect } from '@/components/ui/multi-select';

export function AppendCategory({ form }: { form: any }) {
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
  return (
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
  );
}