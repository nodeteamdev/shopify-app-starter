-- CreateTable
CREATE TABLE "shopify_active_stores" (
    "shop" TEXT NOT NULL,
    "isActive" BOOLEAN DEFAULT false,

    CONSTRAINT "shopify_active_stores_pkey" PRIMARY KEY ("shop")
);

-- CreateTable
CREATE TABLE "shopify_sessions" (
    "id" TEXT NOT NULL,
    "content" TEXT,
    "shop" TEXT,

    CONSTRAINT "shopify_sessions_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "shopify_active_stores_shop_key" ON "shopify_active_stores"("shop");
