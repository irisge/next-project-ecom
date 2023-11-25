/*
  Warnings:

  - The `image` column on the `Product` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "imageAlt" TEXT[],
ADD COLUMN     "tag" TEXT,
DROP COLUMN "image",
ADD COLUMN     "image" TEXT[];
