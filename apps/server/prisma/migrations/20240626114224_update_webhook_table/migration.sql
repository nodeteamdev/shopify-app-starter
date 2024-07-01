/*
  Warnings:

  - The primary key for the `webhooks` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `webhookId` on the `webhooks` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "webhooks_webhookId_idx";

-- AlterTable
ALTER TABLE "webhooks" DROP CONSTRAINT "pk_Webhook",
DROP COLUMN "webhookId",
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "pk_Webhook" PRIMARY KEY ("id");
