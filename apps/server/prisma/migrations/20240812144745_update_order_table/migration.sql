/*
  Warnings:

  - The `createdAt` column on the `orders` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `updatedAt` to the `orders` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "orders" ADD COLUMN "updatedAt" TIMESTAMP(3);
UPDATE "orders" SET "updatedAt" = CURRENT_TIMESTAMP WHERE "updatedAt" IS NULL;
ALTER TABLE "orders" ALTER COLUMN "updatedAt" SET NOT NULL;
ALTER TABLE "orders" ALTER COLUMN "createdAt" TYPE DATE USING to_date("createdAt", 'YYYY-MM-DD');
ALTER TABLE "orders" ALTER COLUMN "createdAt" SET DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "createdAt" SET DATA TYPE TIMESTAMP(3);
