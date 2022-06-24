/*
  Warnings:

  - You are about to drop the column `SIM` on the `Product` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Product" DROP COLUMN "SIM",
ADD COLUMN     "audio_port_3" BOOLEAN,
ADD COLUMN     "battery_capacity" TEXT,
ADD COLUMN     "camera_c_lens" TEXT,
ADD COLUMN     "camera_matrix" TEXT,
ADD COLUMN     "class" TEXT,
ADD COLUMN     "dolby_atmos" BOOLEAN,
ADD COLUMN     "fast_charging" TEXT,
ADD COLUMN     "fingers_scaner" BOOLEAN,
ADD COLUMN     "max_frequency" TEXT,
ADD COLUMN     "max_volume" TEXT,
ADD COLUMN     "nfc" BOOLEAN,
ADD COLUMN     "os" TEXT,
ADD COLUMN     "photo_resolution" TEXT,
ADD COLUMN     "ram_frequency" TEXT,
ADD COLUMN     "sensors" TEXT,
ADD COLUMN     "sim" TEXT,
ADD COLUMN     "sim_type" TEXT,
ADD COLUMN     "stabilization" TEXT,
ADD COLUMN     "wifi_version" TEXT,
ADD COLUMN     "zoom" TEXT,
ALTER COLUMN "wireless_charger" SET DATA TYPE TEXT;
