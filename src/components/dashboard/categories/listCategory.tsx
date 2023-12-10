'use client';
import React from 'react';
import { columns } from '../../dashboard/table/category-column';
import { DataTable } from '../table/data-table';

function ListCategory({
  categoriesData,
  data,
  setData,
}: {
  categoriesData: any;
  data: any;
  setData: any;
}) {
  return (
    <>
      {categoriesData && (
        <DataTable columns={columns} data={data} setData={setData} />
      )}
    </>
  );
}

export default ListCategory;
