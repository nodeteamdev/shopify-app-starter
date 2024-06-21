-- CreateTable
CREATE TABLE "webhooks" (
    "id" UUID NOT NULL,
    "webhookId" TEXT NOT NULL,
    "topic" TEXT NOT NULL,
    "body" JSONB NOT NULL,
    "headers" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "pk_Webhook" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "webhooks_webhookId_idx" ON "webhooks"("webhookId");
