-- AlterTable
ALTER TABLE "Order" ALTER COLUMN "status" SET DEFAULT E'оформлен';

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "html_descr" TEXT,
ADD COLUMN     "short_descr" TEXT,
ALTER COLUMN "description" DROP NOT NULL;
