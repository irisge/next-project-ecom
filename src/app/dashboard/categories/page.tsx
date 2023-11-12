import RedirectButton from '@/components/dashboard/redirectButton'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Pencil, Plus } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

function Categories() {
  return (
    <div className="flex min-h-screen flex-col items-start justify-start px-14 py-10 w-full">
      <h2 className=''>Categories</h2>
      <section className='p-4 my-auto'>
        <Link href='categories/create'>
        <Card>
          <CardHeader>
            <CardTitle>Add a new category</CardTitle>
            <CardDescription>Attach product to this category</CardDescription>
          </CardHeader>
          <CardContent className='flex items-center w-full'>
            <Plus />
          </CardContent>
        </Card>
        </Link>
      </section>
      <section className='p-4 my-auto'>
        <RedirectButton/>
      </section>
    </div>
  )
}

export default Categories