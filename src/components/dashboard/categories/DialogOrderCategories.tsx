'use client';
import React, { SetStateAction } from 'react';

import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogHeader,
  DialogDescription,
  DialogClose,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import ListCategory from '@/components/dashboard/categories/listCategory';

import { Category } from '@/lib/types/interfaces';

function DialogOrderCategories({
  categoriesData,
  setIsOrderModalClose,
  isOrderModalClose,
  data,
  setData,
}: {
  categoriesData: Category[];
  isOrderModalClose: boolean;
  setIsOrderModalClose: React.Dispatch<SetStateAction<boolean>>;
  data: Category[];
  setData: React.Dispatch<SetStateAction<Category[]>>;
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className='flex w-min whitespace-nowrap bg-transparent text-muted-foreground hover:bg-muted '
          onClick={() => {
            setIsOrderModalClose(!isOrderModalClose);
          }}
        >
          Change the order in which products are presented on the site
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you sure absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently remove your data
            from our servers.
          </DialogDescription>
        </DialogHeader>
        {categoriesData && (
          <ListCategory
            categoriesData={categoriesData}
            data={data}
            setData={setData}
          />
        )}
        <div className='space-x-4 place-self-end'>
          <DialogClose asChild>
            <Button type='button' variant='secondary'>
              Close
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button
              onClick={() => {
                setIsOrderModalClose(!isOrderModalClose);
              }}
              variant='outline'
            >
              Save
            </Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default DialogOrderCategories;
