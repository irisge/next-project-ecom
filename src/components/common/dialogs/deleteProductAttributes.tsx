import React, { SetStateAction } from 'react';
import { useRouter } from 'next/navigation';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
export const DeleteProductAttributes = ({
  isDialogDeleteOpen,
  setIsDialogDeleteOpen,
  formatId,
  id,
}: {
  isDialogDeleteOpen: boolean;
  setIsDialogDeleteOpen: React.Dispatch<SetStateAction<boolean>>;
  formatId: string | undefined;
  id: string;
}) => {
  const router = useRouter();
  async function handleDelete(formatId: string) {
    try {
      const url: string = `http://localhost:3000/api/products/${id}/formats/${formatId}`;

      const response = await fetch(url, {
        method: 'DELETE',
      });

      if (response.ok) {
        setIsDialogDeleteOpen(!isDialogDeleteOpen);
        return await response.json();
      } else {
        const errorData = await response.json();
        throw new Error(errorData);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      router.refresh();
    }
  }
  return (
    <Dialog open={isDialogDeleteOpen} onOpenChange={setIsDialogDeleteOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you sure absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently remove your data
            from our servers.
          </DialogDescription>
        </DialogHeader>
        <div className='space-x-4 place-self-end'>
          <Button
            type='button'
            variant='secondary'
            onClick={() => {
              setIsDialogDeleteOpen(!isDialogDeleteOpen);
            }}
          >
            Close
          </Button>
          <Button
            onClick={() => {
              handleDelete(formatId as string);
            }}
            variant='destructive'
          >
            Confirm
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
