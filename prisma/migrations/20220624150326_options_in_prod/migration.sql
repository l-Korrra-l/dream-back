/*
  Warnings:

  - A unique constraint covering the columns `[id]` on the table `Product` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "Bluetooth" TEXT,
ADD COLUMN     "GPS" BOOLEAN,
ADD COLUMN     "SIM" TEXT,
ADD COLUMN     "alarms" BOOLEAN,
ADD COLUMN     "app_store" BOOLEAN,
ADD COLUMN     "battery" TEXT,
ADD COLUMN     "battery_charging" TEXT,
ADD COLUMN     "battery_life" TEXT,
ADD COLUMN     "battery_type" TEXT,
ADD COLUMN     "bracelet_color" TEXT,
ADD COLUMN     "bracelet_material" TEXT,
ADD COLUMN     "buitInCamera" BOOLEAN,
ADD COLUMN     "c_matrixdotts" TEXT,
ADD COLUMN     "calls" TEXT,
ADD COLUMN     "camera" TEXT,
ADD COLUMN     "card_slot" TEXT,
ADD COLUMN     "childish" BOOLEAN,
ADD COLUMN     "chipset" TEXT,
ADD COLUMN     "clock_frequency" TEXT,
ADD COLUMN     "contactless_paymet" BOOLEAN,
ADD COLUMN     "cores_number" TEXT,
ADD COLUMN     "cover_material" TEXT,
ADD COLUMN     "discrete_graphics" BOOLEAN,
ADD COLUMN     "display_characteristics" TEXT,
ADD COLUMN     "display_matrix" TEXT,
ADD COLUMN     "display_protection" TEXT,
ADD COLUMN     "display_resolution" TEXT,
ADD COLUMN     "display_size" DOUBLE PRECISION,
ADD COLUMN     "display_tecnology" TEXT,
ADD COLUMN     "drive_type" TEXT,
ADD COLUMN     "dynamics" TEXT,
ADD COLUMN     "equipment" TEXT,
ADD COLUMN     "flash_memory" TEXT,
ADD COLUMN     "graphic_accelerator" TEXT,
ADD COLUMN     "graphics_card" TEXT,
ADD COLUMN     "internal_memory" TEXT,
ADD COLUMN     "marks" TEXT,
ADD COLUMN     "memory_card" TEXT,
ADD COLUMN     "memory_slots" TEXT,
ADD COLUMN     "mp3_player" BOOLEAN,
ADD COLUMN     "odd" TEXT,
ADD COLUMN     "operation_system" TEXT,
ADD COLUMN     "os_version" TEXT,
ADD COLUMN     "processor" TEXT,
ADD COLUMN     "ram" TEXT,
ADD COLUMN     "ram_type" TEXT,
ADD COLUMN     "rel_date" TIMESTAMP(3),
ADD COLUMN     "scratch_protection" BOOLEAN,
ADD COLUMN     "shell_material" TEXT,
ADD COLUMN     "storage" TEXT,
ADD COLUMN     "storage_capacity" TEXT,
ADD COLUMN     "subcategoryId" INTEGER,
ADD COLUMN     "tdp" TEXT,
ADD COLUMN     "touch_screen" BOOLEAN,
ADD COLUMN     "turbo_frequency" TEXT,
ADD COLUMN     "usb_type" TEXT,
ADD COLUMN     "video" TEXT,
ADD COLUMN     "voice_control" BOOLEAN,
ADD COLUMN     "waterproof" BOOLEAN,
ADD COLUMN     "weight" DOUBLE PRECISION,
ADD COLUMN     "wireless_charger" BOOLEAN;

-- CreateTable
CREATE TABLE "Color" (
    "id" SERIAL NOT NULL,
    "prodId" INTEGER,
    "color" TEXT NOT NULL,
    "img_path" TEXT,

    CONSTRAINT "Color_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Material" (
    "id" SERIAL NOT NULL,
    "prodId" INTEGER,
    "material" TEXT NOT NULL,
    "img_path" TEXT,

    CONSTRAINT "Material_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Subcategory" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "categoryId" INTEGER,

    CONSTRAINT "Subcategory_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Color_id_key" ON "Color"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Material_id_key" ON "Material"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Product_id_key" ON "Product"("id");

-- CreateIndex
CREATE UNIQUE INDEX "User_id_key" ON "User"("id");

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_subcategoryId_fkey" FOREIGN KEY ("subcategoryId") REFERENCES "Subcategory"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Color" ADD CONSTRAINT "Color_prodId_fkey" FOREIGN KEY ("prodId") REFERENCES "Product"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Material" ADD CONSTRAINT "Material_prodId_fkey" FOREIGN KEY ("prodId") REFERENCES "Product"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Subcategory" ADD CONSTRAINT "Subcategory_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE SET NULL ON UPDATE CASCADE;
