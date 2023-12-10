import React from 'react';
import { useRouter } from 'next/navigation';
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import Icon from '@/components/iconComponent';

export const DeleteDialog = ({
  url,
  id,
  redirect,
}: {
  url: string;
  id: string;
  redirect?: string;
}) => {
  const router = useRouter();
  async function handleDelete(id: string) {
    try {
      url = `${url}/${id}`;

      const response = await fetch(url, {
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
    } finally {
      if (redirect) {
        router.push(redirect);
      } else {
        router.refresh();
      }
    }
  }
  return (
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
            This action cannot be undone. This will permanently remove your data
            from our servers.
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
              }}
              variant='destructive'
            >
              Confirm
            </Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
};
