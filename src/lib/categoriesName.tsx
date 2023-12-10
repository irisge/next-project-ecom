import prisma from '@/services/prisma';

export const categories = async () => {
  const res = await prisma.category.findMany({
    select: {
      name: true,
    },
  });
  return res;
};
