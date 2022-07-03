/*
  Warnings:

  - Made the column `text` on table `Information` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Color" ADD COLUMN     "color_code" TEXT;

-- AlterTable
ALTER TABLE "Information" ALTER COLUMN "color" DROP NOT NULL,
ALTER COLUMN "text" SET NOT NULL;
