'use client';

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import Icon from '@/components/iconComponent';

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  setData: any;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  setData,
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const moveUp = async (rowIndex: number) => {
    if (rowIndex === 0) return;
    const newData = [...data];
    [newData[rowIndex], newData[rowIndex - 1]] = [
      newData[rowIndex - 1],
      newData[rowIndex],
    ];
    setData(newData);

    await fetch('http://localhost:3000/api/categories', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ newData }),
    });
  };

  const moveDown = async (rowIndex: number) => {
    if (rowIndex === data.length - 1) return;
    const newData = [...data];
    [newData[rowIndex], newData[rowIndex + 1]] = [
      newData[rowIndex + 1],
      newData[rowIndex],
    ];
    setData(newData);

    await fetch('http://localhost:3000/api/categories', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ newData }),
    });
  };

  return (
    <div className='rounded-md border'>
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody className=''>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row, rowIndex) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && 'selected'}
                className=''
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
                <TableCell className='w-[50px]'>
                  <Button
                    variant='ghost'
                    disabled={rowIndex === 0}
                    onClick={() => moveUp(rowIndex)}
                  >
                    <Icon name='triangle' className='w-4' />
                  </Button>
                  <Button
                    variant='ghost'
                    onClick={() => moveDown(rowIndex)}
                    disabled={rowIndex === data.length - 1}
                  >
                    <Icon name='triangle' className=' w-4 rotate-180' />
                  </Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className='h-24 text-center'>
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
