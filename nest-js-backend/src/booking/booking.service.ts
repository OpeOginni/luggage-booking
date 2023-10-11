import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ApproveBookingDto, CreateBookingDto, GetBookingDto } from './dto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { generateCustomCode } from 'src/utils/crypto';

@Injectable()
export class BookingService {
    constructor(
        private prisma: PrismaService,
    ) { }

    async getAllBookings() {
        try {
            const bookings = await this.prisma.booking.findMany({})

            return bookings;
        } catch (error) {

            throw error;
        }
    }

    async getBooking(dto: GetBookingDto) {
        try {

            const booking = await this.prisma.booking.findUnique({
                where: {
                    id: dto.bookingId
                }
            })

            if (!booking) throw new NotFoundException('No Booking Exists with that ID')

            return booking;
        } catch (error) {
            console.log(error)
            return error
        }
    }

    async createBooking(dto: CreateBookingDto) {
        try {

            const booking = await this.prisma.booking.create({
                data: {
                    transportId: dto.transportId,
                    luggageId: dto.luggageId,
                }
            })

            return booking
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    throw new ForbiddenException('Credentials Taken')
                }
            }
            throw error;
        }
    }

    async updateBookingStatus(dto: ApproveBookingDto) {
        try {

            const booking = await this.prisma.booking.findUnique({
                where: {
                    id: dto.bookingId
                }
            })

            if (!booking) throw new NotFoundException('No Booking Exists with that ID')

            const updatedBooking = await this.prisma.booking.update({
                where: {
                    id: dto.bookingId
                },
                data: {
                    status: dto.status,
                    attendantId: dto.attendantId,
                    bookingVerificationCode: generateCustomCode()
                }
            })

            return updatedBooking

        } catch (error) {
            throw error;

        }
    }
}
