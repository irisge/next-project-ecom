'use client';
import React from 'react';
import { Button } from '../../ui/button';
import { Pencil } from 'lucide-react';
import Link from 'next/link';

export default function redirectButton() {
  return (
    <Link href={'/dashboard/categories/create'}>
      <Button>
        <Pencil className='w-4' /> Create a new category
      </Button>
    </Link>
  );
}
