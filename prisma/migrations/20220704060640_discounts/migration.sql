-- CreateTable
CREATE TABLE "Discount" (
    "id" SERIAL NOT NULL,
    "prodId" INTEGER,
    "discId" INTEGER,
    "value" DECIMAL(65,30) NOT NULL,

    CONSTRAINT "Discount_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DiscountSeason" (
    "id" SERIAL NOT NULL,
    "start_date" TIMESTAMP(3) NOT NULL,
    "end_date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DiscountSeason_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Discount" ADD CONSTRAINT "Discount_prodId_fkey" FOREIGN KEY ("prodId") REFERENCES "Product"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Discount" ADD CONSTRAINT "Discount_discId_fkey" FOREIGN KEY ("discId") REFERENCES "DiscountSeason"("id") ON DELETE SET NULL ON UPDATE CASCADE;
