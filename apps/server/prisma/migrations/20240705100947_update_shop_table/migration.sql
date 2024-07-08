/*
  Warnings:

  - You are about to drop the `stores` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "stores";

-- CreateTable
CREATE TABLE "shops" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "contactEmail" TEXT NOT NULL,
    "myshopifyDomain" TEXT NOT NULL,
    "primaryDomain" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "pk_Shop" PRIMARY KEY ("id")
);
