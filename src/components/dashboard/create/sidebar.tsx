'use client';
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';
import Icon from '@/components/iconComponent';

interface SidebarNavProps extends React.HTMLAttributes<HTMLElement> {
  items: {
    href: string;
    title: string;
    icon?: any;
  }[];
}

export function SidebarNav({ className, items, ...props }: SidebarNavProps) {
  const pathname = usePathname();

  return (
    <nav
      className={cn(
        'flex w-full flex-wrap justify-between lg:flex-col lg:space-x-0 lg:space-y-1',
        className
      )}
      {...props}
    >
      {items.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            buttonVariants({ variant: 'ghost' }),
            pathname === item.href
              ? 'bg-muted hover:bg-muted'
              : 'hover:bg-transparent hover:underline',
            'm-0 flex w-min justify-start space-x-2 place-self-start p-0 hover:bg-muted'
          )}
        >
          {item.icon ? (
            <>
              <Icon name={item?.icon} size={24} />
              <h2>{item.title}</h2>
            </>
          ) : (
            <h2>{item.title}</h2>
          )}
        </Link>
      ))}
    </nav>
  );
}
