-- CreateTable
CREATE TABLE "_ProductToService" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ProductToService_AB_unique" ON "_ProductToService"("A", "B");

-- CreateIndex
CREATE INDEX "_ProductToService_B_index" ON "_ProductToService"("B");

-- AddForeignKey
ALTER TABLE "_ProductToService" ADD CONSTRAINT "_ProductToService_A_fkey" FOREIGN KEY ("A") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProductToService" ADD CONSTRAINT "_ProductToService_B_fkey" FOREIGN KEY ("B") REFERENCES "Service"("id") ON DELETE CASCADE ON UPDATE CASCADE;
