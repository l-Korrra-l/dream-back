/*
  Warnings:

  - You are about to drop the column `phoneNumber` on the `Product` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Product" DROP COLUMN "phoneNumber";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "phoneNumber" TEXT;
