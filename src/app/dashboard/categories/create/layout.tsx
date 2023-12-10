import React from 'react';
import { Separator } from '@/components/ui/separator';
import { Card } from '@/components/ui/card';

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
            Manage your future category settings.
          </p>
        </div>
        <Separator className='my-6' />
        <div className='flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0'>
          <div className='flex-1 lg:max-w-2xl'>{children}</div>
        </div>
      </div>
    </Card>
  );
}
