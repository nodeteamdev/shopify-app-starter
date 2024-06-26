-- CreateTable
CREATE TABLE "stores" (
    "shopName" TEXT NOT NULL,
    "shopId" TEXT NOT NULL,
    "isActive" BOOLEAN DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "pk_ShopifyAuthActiveStore" PRIMARY KEY ("shopName")
);

-- CreateTable
CREATE TABLE "sessions" (
    "id" TEXT NOT NULL,
    "content" TEXT,
    "shop" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "pk_ShopifyAuthSession" PRIMARY KEY ("id")
);
