'use client';
import Image from 'next/image';
import {
  SortableContext,
  arrayMove,
  horizontalListSortingStrategy,
  useSortable,
} from '@dnd-kit/sortable';
import { isMobile } from 'react-device-detect';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { DndContext, closestCenter } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';

interface Category {
  id: string;
  name: string;
  description: string | undefined;
  image: string | undefined;
}
const SortableCategory = ({ category }: { category: Category; index: any }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: category.id });
  const style = {
    transition: transition,
    transform: CSS.Transform.toString(transform),
  };
  return (
    <Card
      key={category.id}
      className='categories h-full'
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={style}
    >
      <Link
        key={category.id}
        href={`http://localhost:3000/dashboard/categories/${category.id}`}
      >
        <CardHeader className='flex items-start'>
          <CardTitle className='capitalize'>{category.name}</CardTitle>
          <CardDescription className='max-w-[200px] truncate'>
            {category.description}
          </CardDescription>
        </CardHeader>
      </Link>
      <CardContent className='flex w-full items-center justify-center'>
        <div className='h-auto w-full rounded-md drop-shadow-md'>
          {category.image && (
            <Image
              src={category.image}
              alt={category.image}
              quality={50}
              width={250}
              height={250}
              className='aspect-square rounded-sm object-cover drop-shadow-sm'
            />
          )}
        </div>
      </CardContent>
    </Card>
  );
};

function CardsCategory() {
  const [categoriesData, setCategoriesData] = useState<Category[] | null>();

  const getAllCategories = async () => {
    const res = await fetch('http://localhost:3000/api/categories');
    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(`${errorData.error}`);
    }
    const data = await res.json();
    return setCategoriesData(data.getAllCategories);
  };

  useEffect(() => {
    getAllCategories();
  }, []);

  const handleDragEnd = async (event: any) => {
    const { active, over } = event;
    // Handle drag end logic here if needed
    if (active.id !== over.id) {
      setCategoriesData((prevCategories) => {
        if (!prevCategories) {
          return [];
        }

        const oldIndex = prevCategories.findIndex(
          (category) => category.id === active.id
        );
        const newIndex = prevCategories.findIndex(
          (category) => category.id === over.id
        );

        if (oldIndex !== -1 && newIndex !== -1) {
          return arrayMove(prevCategories, oldIndex, newIndex);
        }

        return prevCategories;
      });

      await fetch('http://localhost:3000/api/categories', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ categoriesData }),
      });
    }
  };

  return (
    <>
      {isMobile ? (
        <>
          {categoriesData &&
            categoriesData.map((category, index) => (
              <SortableCategory
                key={category.id}
                category={category}
                index={index}
              />
            ))}
        </>
      ) : (
        <DndContext
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={categoriesData || []}
            strategy={horizontalListSortingStrategy}
          >
            {categoriesData &&
              categoriesData.map((category, index) => (
                <SortableCategory
                  key={category.id}
                  category={category}
                  index={index}
                />
              ))}
          </SortableContext>
        </DndContext>
      )}
    </>
  );
}

export default CardsCategory;
