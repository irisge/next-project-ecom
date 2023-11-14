import '../globals.css';
import React from 'react';
import { SidebarNav } from '@/components/dashboard/create/sidebar';

const sidebarNavItems = [
  {
    icon: 'boxes',
    title: 'Categories',
    href: 'categories',
  },
  {
    icon: 'file-image',
    title: 'Products',
    href: 'product',
  },
  {
    icon: 'package-2',
    title: 'Orders',
    href: 'orders',
  },
  {
    icon: 'user-2',
    title: 'Customers',
    href: 'customers',
  },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className='flex min-h-screen w-full flex-col md:flex-row'>
      <div className='flex w-full flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0'>
        <aside className='-mx-4 bg-[#4d4ab4] lg:w-[12%] lg:min-w-min'>
          <SidebarNav
            items={sidebarNavItems}
            className='p-6 text-white lg:p-0 lg:px-6 lg:py-12'
          />
        </aside>
        <section className='m-auto w-full self-center lg:pr-12'>
          {children}
        </section>
      </div>
    </main>
  );
}
