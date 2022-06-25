-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT,
    "password" TEXT,
    "auth" TEXT,
    "firstName" TEXT,
    "lastName" TEXT,
    "phoneNumber" TEXT,
    "birthDate" TEXT,
    "status" BOOLEAN NOT NULL DEFAULT false,
    "role" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Role" (
    "id" SERIAL NOT NULL,
    "roleName" TEXT NOT NULL,

    CONSTRAINT "Role_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Product" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "short_descr" TEXT,
    "description" TEXT,
    "producer" TEXT,
    "price" DECIMAL(65,30) NOT NULL,
    "charact" TEXT,
    "in_stock" INTEGER NOT NULL,
    "img_path" TEXT,
    "categoryId" INTEGER,
    "subcategoryId" INTEGER,
    "raiting" DOUBLE PRECISION NOT NULL,
    "rel_date" TEXT,
    "storage" TEXT,
    "camera_matrix" TEXT,
    "photo_resolution" TEXT,
    "zoom" TEXT,
    "stabilization" TEXT,
    "camera_c_lens" TEXT,
    "wifi_version" TEXT,
    "nfc" BOOLEAN,
    "operation_system" TEXT,
    "os_version" TEXT,
    "display_size" DOUBLE PRECISION,
    "display_resolution" TEXT,
    "display_tecnology" TEXT,
    "display_protection" TEXT,
    "display_matrix" TEXT,
    "display_type" TEXT,
    "weight" TEXT,
    "heigth" TEXT,
    "width" TEXT,
    "thickness" TEXT,
    "sim" TEXT,
    "class" TEXT,
    "sim_type" TEXT,
    "sensors" TEXT,
    "chipset" TEXT,
    "card_slot" TEXT,
    "internal_memory" TEXT,
    "camera" TEXT,
    "video" TEXT,
    "battery_type" TEXT,
    "battery_charging" TEXT,
    "battery_life" TEXT,
    "battery_capacity" TEXT,
    "battery" TEXT,
    "shell_material" TEXT,
    "cover_material" TEXT,
    "back_panel_material" TEXT,
    "fingers_scaner" BOOLEAN,
    "equipment" TEXT,
    "marks" TEXT,
    "max_frequency" TEXT,
    "os" TEXT,
    "ram" TEXT,
    "flash_memory" TEXT,
    "buitInCamera" BOOLEAN,
    "c_matrixdotts" TEXT,
    "childish" BOOLEAN,
    "bracelet_material" TEXT,
    "bracelet_color" TEXT,
    "mp3_player" BOOLEAN,
    "app_store" BOOLEAN,
    "alarms" BOOLEAN,
    "calls" TEXT,
    "voice_control" BOOLEAN,
    "contactless_paymet" BOOLEAN,
    "waterproof" BOOLEAN,
    "touch_screen" BOOLEAN,
    "GPS" BOOLEAN,
    "wireless_charger" TEXT,
    "fast_charging" TEXT,
    "processor" TEXT,
    "graphic_accelerator" TEXT,
    "scratch_protection" BOOLEAN,
    "dynamics" TEXT,
    "audio_port_3" BOOLEAN,
    "dolby_atmos" BOOLEAN,
    "max_volume" TEXT,
    "Bluetooth" TEXT,
    "usb_type" TEXT,
    "cores_number" TEXT,
    "clock_frequency" TEXT,
    "turbo_frequency" TEXT,
    "tdp" TEXT,
    "display_characteristics" TEXT,
    "ram_type" TEXT,
    "ram_frequency" TEXT,
    "memory_slots" TEXT,
    "drive_type" TEXT,
    "storage_capacity" TEXT,
    "odd" TEXT,
    "memory_card" TEXT,
    "discrete_graphics" BOOLEAN,
    "graphics_card" TEXT,
    "condition" TEXT,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

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
CREATE TABLE "Service" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "short_descr" TEXT,
    "description" TEXT,
    "price" DECIMAL(65,30) NOT NULL,
    "img_path" TEXT,
    "raiting" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Service_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Category" (
    "id" SERIAL NOT NULL,
    "categoryName" TEXT NOT NULL,
    "img_path" TEXT,
    "block_type" TEXT,
    "main_page" BOOLEAN DEFAULT false,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Subcategory" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "categoryId" INTEGER,

    CONSTRAINT "Subcategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Order" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER,
    "totalCost" DOUBLE PRECISION,
    "status" TEXT NOT NULL DEFAULT E'registered',
    "date" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Bucket" (
    "id" SERIAL NOT NULL,
    "orderId" INTEGER NOT NULL,
    "prodId" INTEGER,
    "quantity" INTEGER,
    "equipment" TEXT,

    CONSTRAINT "Bucket_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Review" (
    "id" SERIAL NOT NULL,
    "body" TEXT NOT NULL,
    "prodId" INTEGER,
    "serviceId" INTEGER,
    "userId" INTEGER NOT NULL,
    "createdDate" TEXT NOT NULL,
    "raiting" INTEGER NOT NULL,
    "authorName" TEXT NOT NULL,
    "productName" TEXT NOT NULL,
    "text" TEXT NOT NULL,

    CONSTRAINT "Review_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Currency" (
    "id" SERIAL NOT NULL,
    "rate" DOUBLE PRECISION NOT NULL,
    "date" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Currency_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Slider" (
    "id" SERIAL NOT NULL,
    "prodId" INTEGER,
    "title" TEXT,
    "description" TEXT,
    "img_path" TEXT,

    CONSTRAINT "Slider_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_id_key" ON "User"("id");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Product_id_key" ON "Product"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Color_id_key" ON "Color"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Material_id_key" ON "Material"("id");

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_subcategoryId_fkey" FOREIGN KEY ("subcategoryId") REFERENCES "Subcategory"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Color" ADD CONSTRAINT "Color_prodId_fkey" FOREIGN KEY ("prodId") REFERENCES "Product"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Material" ADD CONSTRAINT "Material_prodId_fkey" FOREIGN KEY ("prodId") REFERENCES "Product"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Subcategory" ADD CONSTRAINT "Subcategory_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bucket" ADD CONSTRAINT "Bucket_prodId_fkey" FOREIGN KEY ("prodId") REFERENCES "Product"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bucket" ADD CONSTRAINT "Bucket_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_prodId_fkey" FOREIGN KEY ("prodId") REFERENCES "Product"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "Service"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Slider" ADD CONSTRAINT "Slider_prodId_fkey" FOREIGN KEY ("prodId") REFERENCES "Product"("id") ON DELETE SET NULL ON UPDATE CASCADE;
