import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '../globals.css'
import { Toaster } from '@/components/ui/toaster'
import AdminNavbard from '@/components/dashboard/adminNavbar'
import { SidebarNav } from '@/components/dashboard/create/sidebar'
import { Package2 } from 'lucide-react'

const inter = Inter({ subsets: ['latin'] })

const sidebarNavItems = [
  {
    icon: "boxes",
    title: "Categories",
    href: "categories",
  },
  {
    icon: "file-image",
    title: "Products",
    href: "product",
  },
  {
    icon: "package-2",
    title: "Orders",
    href: "orders",
  },
  {
    icon: "user-2",
    title: "Customers",
    href: "customers",
  },
]

interface SettingsLayoutProps {
  children: React.ReactNode
}


export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
      <main className="flex w-full flex-col md:flex-row min-h-screen">
        <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0 w-full">
          <aside className="-mx-4 lg:w-[12%] lg:min-w-min bg-[#4d4ab4]">
            <SidebarNav items={sidebarNavItems} className='text-white p-6 lg:p-0 lg:px-6 lg:py-12'/>
          </aside>
          <section className='w-full m-auto self-center lg:pr-12'>{children}</section>
        </div>
      </main>
  )
}
