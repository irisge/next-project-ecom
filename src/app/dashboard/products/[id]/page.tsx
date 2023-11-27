'use client';
import React, { useEffect, useState } from 'react';
import { SidebarNav } from '@/components/dashboard/create/sidebar';
import { Separator } from '@/components/ui/separator';
import { Card } from '@/components/ui/card';
import SeoForm from '@/components/common/forms/seoForm';
import { MainCategoryFormEdit } from '@/components/common/forms/mainEditForm';
import ImagesForm from '@/components/common/forms/imagesEditForm';
import { BindToCategory } from '@/components/common/forms/bindToCategory';
import { Button } from '@/components/ui/button';
import { ReloadIcon } from '@radix-ui/react-icons';
import { Product } from '@prisma/client';

const sidebarNavItems = [
  {
    title: 'Main',
    href: 'edit',
  },
  {
    title: 'SEO',
    href: 'edit',
  },
  {
    title: 'Category',
    href: 'edit',
  },
  {
    title: 'Images',
    href: 'edit',
  },
];

function EditCategoryPage({ params }: { params: { id: string } }) {
  const [formStep, setFormStep] = useState<string>('Main');
  const [data, setData] = useState<Product>();

  async function handleFetchCatagoryData(id: string) {
    try {
      const response = await fetch(`http://localhost:3000/api/products/${id}`, {
        method: 'GET',
      });
      if (response.ok) {
        const res = await response.json();
        return setData(res.res);
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
  if (!data) {
    return (
      <Button disabled>
        <ReloadIcon className='mr-2 h-4 w-4 animate-spin' />
        Please wait
      </Button>
    );
  }
  return (
    <Card>
      <div className='block space-y-6 p-10 pb-16'>
        <div className='space-y-0.5'>
          <h2 className='text-2xl font-bold tracking-tight'>Edit</h2>
          <p className='text-muted-foreground'>
            Manage your future product settings and set your product SEO meta
            elements.
          </p>
        </div>
        <Separator className='my-6' />
        <div className='flex flex-col space-y-8 md:flex-row lg:space-x-12 lg:space-y-0'>
          <aside className='-mx-4 md:w-1/5'>
            <SidebarNav items={sidebarNavItems} setFormStep={setFormStep} />
          </aside>
          <div className='flex-1 md:max-w-2xl'>
            {formStep === 'Main' && data && (
              <MainCategoryFormEdit
                id={params.id}
                itemData={data}
                target='product'
              />
            )}
            {formStep === 'SEO' && data && (
              <SeoForm id={params.id} itemData={data} target='product' />
            )}
            {formStep === 'Category' && data && (
              <BindToCategory itemData={data} id={params.id} target='product' />
            )}
            {formStep === 'Images' && data && (
              <ImagesForm itemData={data} id={params.id} target='product' />
            )}
          </div>
        </div>
      </div>
    </Card>
  );
}

export default EditCategoryPage;
