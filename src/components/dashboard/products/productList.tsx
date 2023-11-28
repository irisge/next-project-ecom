import React from 'react';
import Link from 'next/link';
import { Product } from '@/lib/types/interfaces';
import StatusPoint from '@/components/common/dashboard/statusPoint';
import { Badge } from '@/components/ui/badge';

const ProductList = ({ products }: { products: Product[] }) => {
  return (
    <table className='w-full table-auto rounded-md'>
      <thead>
        <tr className='grid grid-cols-4 place-items-start rounded-t-md bg-muted px-2 py-2 font-medium'>
          <th>Name</th>
          <th>Status</th>
          <th>Formats</th>
          <th>Category</th>
        </tr>
      </thead>
      <tbody>
        {products &&
          products.map((product: Product) => (
            <tr
              key={product.id}
              className='border-muter grid border-collapse grid-cols-4 border-x border-b p-2'
            >
              <td>
                <Link
                  className=' '
                  href={`http://localhost:3000/dashboard/products/${product.id}`}
                >
                  <h2 className='transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:cursor-pointer  hover:text-[#4d4ab4]'>
                    {product.name}
                  </h2>
                </Link>
              </td>
              <td>
                <StatusPoint status={product.isActive} />
              </td>
              <td>{product.format.length}</td>
              <td className='space-x-2'>
                {product.categories.map((categ) => (
                  <Badge key={categ.categoryId} className='space-x-2'>
                    {categ.category?.name}
                  </Badge>
                ))}
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  );
};
export default ProductList;
