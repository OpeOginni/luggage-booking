/*
  Warnings:

  - You are about to drop the column `bookingDate` on the `bookings` table. All the data in the column will be lost.
  - You are about to drop the column `bookingId` on the `lagguages` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `lagguages` table. All the data in the column will be lost.
  - You are about to drop the column `pictures` on the `lagguages` table. All the data in the column will be lost.
  - You are about to drop the `bookmarks` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `departure` to the `bookings` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lauggageTransportId` to the `lagguages` table without a default value. This is not possible if the table is not empty.
  - Added the required column `manningStatus` to the `lagguages` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "ManningStatus" AS ENUM ('MANNED', 'UNMANNED');

-- CreateEnum
CREATE TYPE "LuggageStatus" AS ENUM ('ACCEPTED', 'REJECTED');

-- CreateEnum
CREATE TYPE "DeliveryStatus" AS ENUM ('DELIVERED', 'IN_TRANSIT');

-- CreateEnum
CREATE TYPE "AdminRole" AS ENUM ('LUGGAGE_ATTENDANT');

-- DropForeignKey
ALTER TABLE "bookmarks" DROP CONSTRAINT "bookmarks_userId_fkey";

-- DropForeignKey
ALTER TABLE "lagguages" DROP CONSTRAINT "lagguages_bookingId_fkey";

-- AlterTable
ALTER TABLE "bookings" DROP COLUMN "bookingDate",
ADD COLUMN     "departure" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "lagguages" DROP COLUMN "bookingId",
DROP COLUMN "description",
DROP COLUMN "pictures",
ADD COLUMN     "bookingDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "images" TEXT[],
ADD COLUMN     "items" TEXT[],
ADD COLUMN     "lauggageTransportId" INTEGER NOT NULL,
ADD COLUMN     "manningStatus" "ManningStatus" NOT NULL;

-- DropTable
DROP TABLE "bookmarks";

-- CreateTable
CREATE TABLE "admins" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "firstName" TEXT,
    "lastName" TEXT,
    "role" "AdminRole" NOT NULL,

    CONSTRAINT "admins_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "admins_email_key" ON "admins"("email");

-- AddForeignKey
ALTER TABLE "lagguages" ADD CONSTRAINT "lagguages_lauggageTransportId_fkey" FOREIGN KEY ("lauggageTransportId") REFERENCES "bookings"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
