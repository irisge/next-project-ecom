'use client';
import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ReloadIcon } from '@radix-ui/react-icons';
import { Category, Product } from '@prisma/client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogClose,
  DialogTitle,
  DialogHeader,
  DialogDescription,
} from '@/components/ui/dialog';

import Icon from '@/components/iconComponent';
import {
  Category as CategoryWithRelation,
  Product as ProductWithRelations,
} from '@/lib/types/interfaces';
import { AddNewImage } from '../dialogs/addNewImage';

function ImagesForm({
  itemData,
  target,
  id,
}: {
  itemData: Category | Product;
  target: string;
  id: string;
}) {
  const router = useRouter();

  if (!itemData) {
    return (
      <Button disabled>
        <ReloadIcon className='mr-2 h-4 w-4 animate-spin' />
        Please wait
      </Button>
    );
  }

  async function handleDelete(imageId: string) {
    try {
      let url: string;
      if (target === 'category')
        url = `http://localhost:3000/api/categories/${id}/images/${imageId}`;
      else {
        url = `http://localhost:3000/api/products/${id}/images/${imageId}`;
      }
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
      router.refresh();
    }
  }
  return (
    <>
      {(
        itemData as unknown as ProductWithRelations | CategoryWithRelation
      ).images.map(
        (item: { id: string; imageDescription: string; url: string }) => (
          <div key={item.id}>
            <Image
              src={item.url}
              width={250}
              height={250}
              alt={item.imageDescription}
            />
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
                    This action cannot be undone. This will permanently remove
                    your data from our servers.
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
                        handleDelete(item.id);
                      }}
                      variant='destructive'
                    >
                      Confirm
                    </Button>
                  </DialogClose>
                </div>
              </DialogContent>
            </Dialog>
            <p>{item.imageDescription}</p>
          </div>
        )
      )}
      <AddNewImage target={target} id={id} />
    </>
  );
}

export default ImagesForm;
