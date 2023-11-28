'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import ProductList from '@/components/dashboard/products/productList';
import Loading from './loading';
import { Product } from '@/lib/types/interfaces';

function ProductsPage() {
  const [loading, setLoading] = useState<boolean>(true);
  const [products, setProducts] = useState<Product[]>([]);

  const handleFetchProducts = () =>
    fetch('http://localhost:3000/api/products')
      .then((res) => res.json())
      .then((res) => {
        setLoading(false);
        setProducts(res.getAllProducts);
      });

  useEffect(() => {
    handleFetchProducts();
  }, []);

  return (
    <div className='flex min-h-screen w-full flex-col items-start justify-start space-y-4 '>
      <h2 className='font-bold text-[#4d4ab4]'>Products</h2>
      <section className='my-auto flex w-full '>
        <Link href='products/create' className='h-full'>
          <Button> Add new product</Button>
        </Link>
      </section>
      <section className='my-auto flex w-full flex-col '>
        {loading ? <Loading /> : <ProductList products={products} />}
      </section>
    </div>
  );
}

export default ProductsPage;
