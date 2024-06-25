-- CreateTable
CREATE TABLE "shopify_auth_active_stores" (
    "shopName" TEXT NOT NULL,
    "isActive" BOOLEAN DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "pk_ShopifyAuthActiveStore" PRIMARY KEY ("shopName")
);

-- CreateTable
CREATE TABLE "shopify_auth_sessions" (
    "id" TEXT NOT NULL,
    "content" TEXT,
    "shop" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "pk_ShopifyAuthSession" PRIMARY KEY ("id")
);
