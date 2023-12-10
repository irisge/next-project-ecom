'use client';
import React, { useEffect, useState } from 'react';
import { SidebarNav } from '@/components/common/sidebar';
import { Separator } from '@/components/ui/separator';
import { Card } from '@/components/ui/card';
import SeoForm from '@/components/common/forms/seoForm';
import { MainCategoryFormEdit } from '@/components/common/forms/mainEditForm';
import ImagesForm from '@/components/common/forms/imagesEditForm';
import { BindToCategory } from '@/components/common/forms/bindToCategory';
import { Product } from '@prisma/client';
import { Product as ProductWithRelations } from '@/lib/types/interfaces';
import { ProductAttributesFormEdit } from '@/components/common/forms/productAttributesFormEdit';
import { DeleteDialog } from '@/components/common/dialogs/deleteDialog';

const sidebarNavItems = [
  {
    title: 'Main',
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
  {
    title: 'Price and stock',
    href: 'edit',
  },
  {
    title: 'SEO',
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

  return (
    <Card>
      <div className='block space-y-6 p-10 pb-16'>
        <div className='space-y-0.5'>
          <h2 className='text-2xl font-bold tracking-tight'>Edit</h2>
          <div className='flex w-full flex-col items-end justify-between sm:flex-row sm:items-center'>
            <p className='text-muted-foreground'>
              Manage your future product settings and set your product SEO meta
              elements.
            </p>
            <DeleteDialog
              url={'http://localhost:3000/api/products'}
              id={params.id}
              redirect={'http://localhost:3000/dashboard/products/'}
            />
          </div>
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
            {formStep === 'Price and stock' && data && (
              <ProductAttributesFormEdit
                id={params.id}
                itemData={data as unknown as ProductWithRelations}
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
