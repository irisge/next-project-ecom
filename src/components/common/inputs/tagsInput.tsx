import React, { useState } from 'react';
import { Product } from '@prisma/client';

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Tag, TagInput } from '@/components/ui/tag-input';
import { Badge } from '@/components/ui/badge';

export function TagsInput({
  form,
  itemData,
}: {
  form: any;
  itemData?: Product;
}) {
  const { setValue } = form;
  const [tags, setTags] = useState<Tag[]>([]);

  return (
    <FormField
      control={form.control}
      name='tags'
      render={({ field }) => (
        <FormItem className='flex flex-col items-start'>
          <FormLabel className='text-left'>Tags</FormLabel>
          <div className='flex w-full space-x-2 font-normal '>
            {itemData &&
              (itemData as Product).tag.map((el) => (
                <Badge
                  key={el}
                  className='mr-2 h-8 rounded-md bg-muted p-2 text-primary hover:bg-muted'
                >
                  {el}
                </Badge>
              ))}
          </div>
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
            These are the topics related to this product.
          </FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
