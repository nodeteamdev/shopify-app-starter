/*
  Warnings:

  - You are about to drop the column `returnUrl` on the `app_subscriptions` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "app_subscriptions" DROP COLUMN "returnUrl";
