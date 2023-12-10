import React from 'react';
import { Plus } from 'lucide-react';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

function CardAddCategory() {
  return (
    <Card className='h-full'>
      <CardHeader>
        <CardTitle>Add a new category</CardTitle>
        <CardDescription>Attach product to this category</CardDescription>
      </CardHeader>
      <CardContent className='flex w-full items-center justify-center'>
        <div className='relative flex h-[200px] w-[200px] items-center justify-center rounded-md drop-shadow-md'>
          <Plus className='place-self-center' />
        </div>
      </CardContent>
    </Card>
  );
}

export default CardAddCategory;
