import React from 'react';
import { SidebarNav } from '@/components/dashboard/create/sidebar';
import { Separator } from '@/components/ui/separator';
import { Card } from '@/components/ui/card';

const sidebarNavItems = [
  {
    title: 'Main',
    href: 'create',
  },
  {
    title: 'SEO',
    href: 'create/seo',
  },
  {
    title: 'Products',
    href: 'create/products',
  },
  {
    title: 'Preview',
    href: 'create/display',
  },
];

interface SettingsLayoutProps {
  children: React.ReactNode;
}

export default function SettingsLayout({ children }: SettingsLayoutProps) {
  return (
    <Card>
      <div className='block space-y-6 p-10 pb-16'>
        <div className='space-y-0.5'>
          <h2 className='text-2xl font-bold tracking-tight'>Create</h2>
          <p className='text-muted-foreground'>
            Manage your future category settings and set category SEO and
            products.
          </p>
        </div>
        <Separator className='my-6' />
        <div className='flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0'>
          <aside className='-mx-4 lg:w-1/5'>
            <SidebarNav items={sidebarNavItems} />
          </aside>
          <div className='flex-1 lg:max-w-2xl'>{children}</div>
        </div>
      </div>
    </Card>
  );
}
