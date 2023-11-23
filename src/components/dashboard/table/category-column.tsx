'use client';

import { ColumnDef } from '@tanstack/react-table';
import StatusPoint from '../statusPoint';

export type Category = {
  id: string;
  name: number;
  status: 'active' | 'disabled';
  products: [];
};

export const columns: ColumnDef<Category>[] = [
  {
    accessorKey: 'name',
    header: 'name',
  },
  {
    accessorKey: 'isActive',
    header: 'status',
    cell: ({ row }) => {
      const isActive: boolean = row.getValue('isActive');
      return <StatusPoint status={isActive} />;
    },
  },
  {
    accessorKey: 'products',
    header: 'products',
  }
];
