/*
  Warnings:

  - You are about to drop the column `condition` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the `Order` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Bucket" DROP CONSTRAINT "Bucket_orderId_fkey";

-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_userId_fkey";

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "condition",
ADD COLUMN     "condition_" TEXT;

-- DropTable
DROP TABLE "Order";

-- CreateTable
CREATE TABLE "Order_" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER,
    "totalCost" DOUBLE PRECISION,
    "status" TEXT NOT NULL DEFAULT E'registered',
    "date" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Order__pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Order_" ADD CONSTRAINT "Order__userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bucket" ADD CONSTRAINT "Bucket_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order_"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
