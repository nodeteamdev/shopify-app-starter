-- CreateTable
CREATE TABLE "orders" (
    "id" TEXT NOT NULL,
    "createdAt" TEXT NOT NULL,
    "currencyCode" TEXT NOT NULL,
    "displayFinancialStatus" TEXT NOT NULL,
    "lineItems" JSONB[],
    "shopId" TEXT NOT NULL,

    CONSTRAINT "pk_Order" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_shopId_fkey" FOREIGN KEY ("shopId") REFERENCES "shops"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
