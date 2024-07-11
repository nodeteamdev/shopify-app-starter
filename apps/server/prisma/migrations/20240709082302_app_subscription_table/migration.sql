-- CreateEnum
CREATE TYPE "AppSubscriptionStatusesEnum" AS ENUM ('ACTIVE', 'CANCELLED', 'DECLINED', 'EXPIRED', 'FROZEN', 'PENDING');

-- CreateTable
CREATE TABLE "app_subscriptions" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "returnUrl" TEXT NOT NULL,
    "confirmationUrl" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "currencyCode" TEXT NOT NULL,
    "status" "AppSubscriptionStatusesEnum" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "pk_AppSubscription" PRIMARY KEY ("id")
);
