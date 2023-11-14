'use client';
import React from 'react';
import { Menubar, MenubarMenu, MenubarTrigger } from '../ui/menubar';
import { Package, Boxes, FileImage, User2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

function AdminNavbar() {
  const router = useRouter();
  return (
    <nav className='h-full bg-[#4d4ab4] md:min-h-screen md:w-min'>
      <Menubar className='flex h-full flex-wrap items-center rounded-none border-none bg-[#4d4ab4] text-white md:w-full md:flex-col md:items-start md:space-x-0 md:space-y-8 md:pt-20'>
        <MenubarMenu>
          <MenubarTrigger onClick={() => router.push('/dashboard/categories')}>
            <span className='flex items-center space-x-2 self-start'>
              <Boxes className='hover:text-black' color='white' size={24} />
              <h2>Categories</h2>
            </span>
          </MenubarTrigger>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger onClick={() => router.push('/dashboard/categories')}>
            <span className='flex items-center space-x-2'>
              <FileImage color='white' size={24} />
              <h2>Products</h2>
            </span>
          </MenubarTrigger>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger onClick={() => router.push('/dashboard/categories')}>
            <span className='flex items-center space-x-2'>
              <Package color='white' size={24} />
              <h2>Orders</h2>
            </span>
          </MenubarTrigger>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger onClick={() => router.push('/dashboard/categories')}>
            <span className='flex items-center space-x-2'>
              <User2 color='white' size={24} />
              <h2>Customers</h2>
            </span>
          </MenubarTrigger>
        </MenubarMenu>
      </Menubar>
    </nav>
  );
}

export default AdminNavbar;
