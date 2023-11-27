'use client';
import { Button } from '@/components/ui/button';
import { Product } from '@prisma/client';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

function ProductsPage() {
  const [products, setProducts] = useState([]);
  const handleFetchProducts = () =>
    fetch('http://localhost:3000/api/products')
      .then((res) => res.json())
      .then((res) => {
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
        {products &&
          products.map((product: Product) => (
            <li className='list-none' key={product.id}>
              <Link
                href={`http://localhost:3000/dashboard/products/${product.id}`}
              >
                <h2>{product.name}</h2>
              </Link>
            </li>
          ))}
      </section>
    </div>
  );
}

export default ProductsPage;
