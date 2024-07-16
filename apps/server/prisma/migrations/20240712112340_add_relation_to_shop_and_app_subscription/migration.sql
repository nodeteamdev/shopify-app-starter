/*
  Warnings:

  - A unique constraint covering the columns `[shopId]` on the table `app_subscriptions` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `shopId` to the `app_subscriptions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "app_subscriptions" ADD COLUMN     "shopId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "app_subscriptions_shopId_key" ON "app_subscriptions"("shopId");

-- AddForeignKey
ALTER TABLE "app_subscriptions" ADD CONSTRAINT "app_subscriptions_shopId_fkey" FOREIGN KEY ("shopId") REFERENCES "shops"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
