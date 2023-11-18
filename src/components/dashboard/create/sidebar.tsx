'use client';
import React, { SetStateAction } from 'react';
import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';
import Icon from '@/components/iconComponent';
import { NavigationMenuItem } from '@radix-ui/react-navigation-menu';

interface SidebarNavProps extends React.HTMLAttributes<HTMLElement> {
  items: {
    href: string;
    title: string;
    icon?: any;
  }[];
  setFormStep: React.Dispatch<SetStateAction<string>>;
}

export function SidebarNav({
  className,
  items,
  setFormStep,
  ...props
}: SidebarNavProps) {
  return (
    <nav
      className={cn(
        'sm:justify-between md:flex md:flex-col	lg:space-x-0 lg:space-y-1 grid w-full 2xs:grid-cols-side xs:auto-cols-auto xs:grid-flow-col',
        className
      )}
      {...props}
    >
      {items.map((item) => (
        <NavigationMenuItem
          key={item.href}
          className={cn(
            buttonVariants({ variant: 'ghost' }),
            'p-auto m-0 justify-start space-x-2 place-self-start bg-transparent text-secondary-foreground hover:bg-muted'
          )}
          onClick={() => setFormStep(item.title)}
        >
          {item.icon ? (
            <>
              <Icon name={item?.icon} size={24} />
              <h2>{item.title}</h2>
            </>
          ) : (
            <h2>{item.title}</h2>
          )}
        </NavigationMenuItem>
      ))}
    </nav>
  );
}
