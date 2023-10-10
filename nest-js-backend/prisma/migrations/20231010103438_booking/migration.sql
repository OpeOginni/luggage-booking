/*
  Warnings:

  - You are about to drop the column `departure` on the `bookings` table. All the data in the column will be lost.
  - You are about to drop the `admins` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `lagguages` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[luggageId]` on the table `bookings` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `attendantId` to the `bookings` table without a default value. This is not possible if the table is not empty.
  - Added the required column `luggageId` to the `bookings` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `bookings` table without a default value. This is not possible if the table is not empty.
  - Added the required column `transportId` to the `bookings` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `bookings` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "BookingStatus" AS ENUM ('ACCEPTED', 'REJECTED');

-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "AdminRole" ADD VALUE 'ADMIN';
ALTER TYPE "AdminRole" ADD VALUE 'USER';

-- DropForeignKey
ALTER TABLE "lagguages" DROP CONSTRAINT "lagguages_lauggageTransportId_fkey";

-- DropForeignKey
ALTER TABLE "lagguages" DROP CONSTRAINT "lagguages_userId_fkey";

-- AlterTable
ALTER TABLE "bookings" DROP COLUMN "departure",
ADD COLUMN     "attendantId" INTEGER NOT NULL,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "luggageId" INTEGER NOT NULL,
ADD COLUMN     "status" "BookingStatus" NOT NULL,
ADD COLUMN     "transportId" INTEGER NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "role" "AdminRole" NOT NULL DEFAULT 'USER';

-- DropTable
DROP TABLE "admins";

-- DropTable
DROP TABLE "lagguages";

-- DropEnum
DROP TYPE "LuggageStatus";

-- CreateTable
CREATE TABLE "luggages" (
    "id" SERIAL NOT NULL,
    "size" INTEGER NOT NULL,
    "images" TEXT[],
    "items" TEXT[],
    "manningStatus" "ManningStatus" NOT NULL,
    "userId" INTEGER NOT NULL,
    "bookingId" INTEGER NOT NULL,
    "bookingDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "luggages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "transports" (
    "id" SERIAL NOT NULL,
    "departure" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "transports_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "bookings_luggageId_key" ON "bookings"("luggageId");

-- AddForeignKey
ALTER TABLE "luggages" ADD CONSTRAINT "luggages_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bookings" ADD CONSTRAINT "bookings_luggageId_fkey" FOREIGN KEY ("luggageId") REFERENCES "luggages"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bookings" ADD CONSTRAINT "bookings_transportId_fkey" FOREIGN KEY ("transportId") REFERENCES "transports"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
