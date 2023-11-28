import { Product } from '@prisma/client';
import React from 'react';
import Link from 'next/link';

const ProductList = ({ products }: { products: Product[] }) => {
  return (
    <>
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
    </>
  );
};
export default ProductList;
