-- CreateEnum
CREATE TYPE "EcommercePlatformsEnum" AS ENUM ('SHOPIFY', 'WOO_COMMERCE');

-- CreateTable
CREATE TABLE "webhooks" (
    "id" UUID NOT NULL,
    "webhookId" TEXT NOT NULL,
    "ecommercePlatform" "EcommercePlatformsEnum" NOT NULL,
    "topic" TEXT NOT NULL,
    "body" JSONB NOT NULL,
    "headers" JSONB NOT NULL,
    "expiredAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "pk_Webhook" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "webhooks_webhookId_idx" ON "webhooks"("webhookId");

-- CreateIndex
CREATE INDEX "webhooks_expiredAt_idx" ON "webhooks"("expiredAt");
