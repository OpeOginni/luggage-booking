-- CreateEnum
CREATE TYPE "BookingStatus" AS ENUM ('ACCEPTED', 'PENDING', 'REJECTED');

-- CreateEnum
CREATE TYPE "DeliveryStatus" AS ENUM ('DELIVERED', 'IN_TRANSIT');

-- CreateEnum
CREATE TYPE "AdminRole" AS ENUM ('USER', 'ADMIN', 'LUGGAGE_ATTENDANT', 'CHECK_IN_PERSONNEL');

-- CreateEnum
CREATE TYPE "TransportType" AS ENUM ('JETTY', 'BOLT');

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "firstName" TEXT,
    "lastName" TEXT,
    "role" "AdminRole" NOT NULL DEFAULT 'USER',

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "luggages" (
    "id" SERIAL NOT NULL,
    "size" INTEGER NOT NULL,
    "images" TEXT[],
    "items" TEXT[],
    "dangerousItems" BOOLEAN NOT NULL DEFAULT false,
    "userId" INTEGER NOT NULL,
    "recieverName" TEXT NOT NULL,

    CONSTRAINT "luggages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "bookings" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "luggageId" INTEGER NOT NULL,
    "transportId" INTEGER NOT NULL,
    "status" "BookingStatus" NOT NULL DEFAULT 'PENDING',
    "attendantId" INTEGER,
    "bookingVerificationCode" TEXT,

    CONSTRAINT "bookings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "transports" (
    "id" SERIAL NOT NULL,
    "departure" TIMESTAMP(3) NOT NULL,
    "transportCode" TEXT NOT NULL,
    "transportType" "TransportType" NOT NULL,
    "destination" TEXT NOT NULL,
    "maxBookingSlots" INTEGER NOT NULL,

    CONSTRAINT "transports_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "bookings_luggageId_key" ON "bookings"("luggageId");

-- AddForeignKey
ALTER TABLE "luggages" ADD CONSTRAINT "luggages_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bookings" ADD CONSTRAINT "bookings_luggageId_fkey" FOREIGN KEY ("luggageId") REFERENCES "luggages"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bookings" ADD CONSTRAINT "bookings_transportId_fkey" FOREIGN KEY ("transportId") REFERENCES "transports"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
