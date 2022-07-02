-- CreateTable
CREATE TABLE "Information" (
    "id" SERIAL NOT NULL,
    "prodId" INTEGER,
    "color" TEXT NOT NULL,
    "img_path" TEXT,
    "text" TEXT,

    CONSTRAINT "Information_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Information_id_key" ON "Information"("id");

-- AddForeignKey
ALTER TABLE "Information" ADD CONSTRAINT "Information_prodId_fkey" FOREIGN KEY ("prodId") REFERENCES "Product"("id") ON DELETE SET NULL ON UPDATE CASCADE;
