"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import Icon from "@/components/iconComponent"

interface SidebarNavProps extends React.HTMLAttributes<HTMLElement> {
  items: {
    href: string
    title: string
    icon?: any
  }[]
}

export function SidebarNav({ className, items, ...props }: SidebarNavProps) {
  const pathname = usePathname()

  return (
    <nav
      className={cn(
        "flex justify-between lg:flex-col lg:space-x-0 lg:space-y-1 flex-wrap w-full",
        className
      )}
      {...props}
    >
      {items.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            buttonVariants({ variant: "ghost" }),
            pathname === item.href
              ? "bg-muted hover:bg-muted"
              : "hover:bg-transparent hover:underline",
            "justify-start space-x-2 hover:bg-muted flex w-min place-self-start p-0 m-0"
          )}
        >
          {item.icon ? 
          <><Icon name={item?.icon} size={24}/><h2>{item.title}</h2> </>: 
          <h2>{item.title}</h2>}
        </Link>
      ))}
    </nav>
  )
}