-- AlterTable
ALTER TABLE "User" ADD COLUMN     "hasSub" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "plan" TEXT NOT NULL DEFAULT 'free',
ADD COLUMN     "subscription_current_period_end" TIMESTAMP(3),
ADD COLUMN     "subscription_price_id" TEXT,
ADD COLUMN     "subscription_product_id" TEXT,
ADD COLUMN     "subscription_status" TEXT;
