/*
  Warnings:

  - You are about to drop the column `SIM` on the `Product` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Bucket" ADD COLUMN     "equipment" TEXT;

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "SIM";
