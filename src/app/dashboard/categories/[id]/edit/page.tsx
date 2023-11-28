'use client';
import React, { useEffect, useState } from 'react';
import { Category } from '@prisma/client';
import { ReloadIcon } from '@radix-ui/react-icons';

import { SidebarNav } from '@/components/common/sidebar';
import { Separator } from '@/components/ui/separator';
import { Card } from '@/components/ui/card';
import SeoForm from '@/components/common/forms/seoForm';
import { MainCategoryFormEdit } from '@/components/common/forms/mainEditForm';
import ImagesForm from '@/components/common/forms/imagesEditForm';
import { Button } from '@/components/ui/button';
import { BindToProduct } from '@/components/common/forms/bindToProduct';

const sidebarNavItems = [
  {
    title: 'Main',
    href: 'create',
  },
  {
    title: 'SEO',
    href: 'create',
  },
  {
    title: 'Products',
    href: 'create',
  },
  {
    title: 'Images',
    href: 'create',
  },
];

function EditCategoryPage({ params }: { params: { id: string } }) {
  const [formStep, setFormStep] = useState<string>('Main');
  const [categoryData, setCatagoryData] = useState<Category>();
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
        return setCatagoryData(res.res);
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

  if (!categoryData) {
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
                itemData={categoryData}
                target='category'
              />
            )}
            {formStep === 'SEO' && (
              <SeoForm
                id={params.id}
                itemData={categoryData}
                target={'category'}
              />
            )}
            {formStep === 'Products' && (
              <BindToProduct
                id={params.id}
                itemData={categoryData}
                target={'category'}
              />
            )}
            {formStep === 'Images' && (
              <ImagesForm
                id={params.id}
                itemData={categoryData}
                target='category'
              />
            )}
          </div>
        </div>
      </div>
    </Card>
  );
}

export default EditCategoryPage;
