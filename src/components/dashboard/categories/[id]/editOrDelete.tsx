'use client';

import React from 'react';
import Link from 'next/link';

import Icon from '@/components/iconComponent';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from '@/components/ui/dialog';
import { useRouter } from 'next/navigation';

async function handleDelete(id: string) {
  try {
    const response = await fetch(`http://localhost:3000/api/categories/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      return await response.json();
    } else {
      const errorData = await response.json();
      throw new Error(errorData);
    }
  } catch (error) {
    console.error('Error:', error);
  }
}
const EditOrDelete = ({ id }: { id: string }) => {
  const router = useRouter();
  return (
    <>
      <span className='flex w-min items-center space-x-6'>
        <Link href={`http://localhost:3000/dashboard/categories/${id}/edit`}>
          <Button className='bg-transparent hover:bg-muted'>
            <Icon name='pencil' color='#4d4ab4' />
          </Button>
        </Link>
        <Dialog>
          <DialogTrigger asChild>
            <Button className='bg-transparent hover:bg-muted'>
              <Icon name='trash-2' color='#CC3333' />
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Are you sure absolutely sure?</DialogTitle>
              <DialogDescription>
                This action cannot be undone. This will permanently remove your
                data from our servers.
              </DialogDescription>
            </DialogHeader>
            <div className='space-x-4 place-self-end'>
              <DialogClose asChild>
                <Button type='button' variant='secondary'>
                  Close
                </Button>
              </DialogClose>
              <DialogClose asChild>
                <Button
                  onClick={() => {
                    handleDelete(id);
                    router.push('http://localhost:3000/dashboard/categories');
                    router.refresh();
                  }}
                  variant='destructive'
                >
                  Confirm
                </Button>
              </DialogClose>
            </div>
          </DialogContent>
        </Dialog>
      </span>
    </>
  );
};

export default EditOrDelete;
