'use client';
import Icon from '@/components/iconComponent';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import React from 'react';

async function handleDelete(id: string) {
  try {
    const response = await fetch(`http://localhost:3000/api/categories/${id}`, {
      method: 'DELETE',
    });

    // Check if the request was successful (status code 2xx)
    if (response.ok) {
      console.log(response);
      // Handle success, e.g., show a success message
      return await response.json();
    } else {
      const errorData = await response.json(); // Parse JSON response
      throw new Error(errorData);
    }
  } catch (error) {
    console.error('Error:', error);
  }
}
const EditOrDelete = ({ id }: { id: string }) => {
  return (
    <>
      <span className='flex w-min items-center space-x-6'>
        <Link href={`http://localhost:3000/dashboard/categories/${id}/edit`}>
          <Button className='bg-transparent'>
            <Icon name='pencil' color='#4d4ab4' />
          </Button>
        </Link>
        <Button onClick={() => handleDelete(id)} className='bg-transparent'>
          <Icon name='trash-2' color='#CC3333' />
        </Button>
      </span>
    </>
  );
};

export default EditOrDelete;
