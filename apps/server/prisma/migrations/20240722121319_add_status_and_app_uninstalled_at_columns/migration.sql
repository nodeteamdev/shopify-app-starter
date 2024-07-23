-- CreateEnum
CREATE TYPE "ShopStatusesEnum" AS ENUM ('ACTIVE', 'INACTIVE');

-- AlterTable
ALTER TABLE "shops" ADD COLUMN     "appUninstalledAt" TIMESTAMP(3),
ADD COLUMN     "status" "ShopStatusesEnum" NOT NULL DEFAULT 'ACTIVE';
