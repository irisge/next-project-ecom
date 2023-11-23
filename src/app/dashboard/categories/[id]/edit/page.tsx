'use client';
import React, { useEffect, useState } from 'react';
import { SidebarNav } from '@/components/dashboard/create/sidebar';
import { Separator } from '@/components/ui/separator';
import { Card } from '@/components/ui/card';
import SeoForm from '@/components/dashboard/categories/[id]/edit/seoForm';
import { MainCategoryFormEdit } from '@/components/dashboard/categories/[id]/edit/mainForm';

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

function EditCategoryPage({ params }: { params: { id: string } }) {
  const [formStep, setFormStep] = useState<string>('Main');
  const [categoryData, setCatagoryData] = useState([]);
  async function handleFetchCatagoryData(id: string) {
    try {
      const response = await fetch(
        `http://localhost:3000/api/categories/${id}`,
        {
          method: 'GET',
        }
      );
      if (response.ok) {
        const res = await response.json();
        return setCatagoryData(res);
      } else {
        const errorData = await response.json();
        console.error(errorData);
      }
      return await response.json();
    } catch (error: any) {
      throw new Error(error);
    }
  }

  useEffect(() => {
    handleFetchCatagoryData(params['id']);
  }, [params, params.id]);

  return (
    <Card>
      <div className='block space-y-6 p-10 pb-16'>
        <div className='space-y-0.5'>
          <h2 className='text-2xl font-bold tracking-tight'>Edit</h2>
          <p className='text-muted-foreground'>
            Manage your future category settings and set category SEO and
            products.
          </p>
        </div>
        <Separator className='my-6' />
        <div className='flex flex-col space-y-8 md:flex-row lg:space-x-12 lg:space-y-0'>
          <aside className='-mx-4 md:w-1/5'>
            <SidebarNav items={sidebarNavItems} setFormStep={setFormStep} />
          </aside>
          <div className='flex-1 md:max-w-2xl'>
            {formStep === 'Main' && (
              <MainCategoryFormEdit
                id={params.id}
                categoryData={categoryData}
              />
            )}
            {formStep === 'SEO' && (
              <SeoForm id={params.id} categoryData={categoryData} />
            )}
          </div>
        </div>
      </div>
    </Card>
  );
}

export default EditCategoryPage;
