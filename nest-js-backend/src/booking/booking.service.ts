import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ApproveBookingDto, CreateBookingDto, GetBookingDto, GetMyBookingsDto } from './dto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { generateCustomCode } from 'src/utils/crypto';
import { User } from '@prisma/client';
import { BookingStatus } from 'src/auth/enums';

@Injectable()
export class BookingService {
    constructor(
        private prisma: PrismaService,
    ) { }

    async getAllBookingsWithQuery(status: BookingStatus) {
        try {

            const bookings = await this.prisma.booking.findMany({
                where: {
                    status: status
                }
            })
            return bookings


        } catch (error) {

            throw error;
        }
    }

    async getAllBookings() {
        try {

            const bookings = await this.prisma.booking.findMany({})

            return bookings;
        } catch (error) {

            throw error;
        }
    }

    async getBooking(dto: GetBookingDto) {

        const booking = await this.prisma.booking.findUnique({
            where: {
                id: dto.bookingId
            }, include: {
                luggage: true,
                transport: true,
            },
        })

        if (!booking) throw new BadRequestException('No Booking Exists with that ID')

        return booking;

    }

    async myBookings(dto: GetMyBookingsDto) {

        const bookings = await this.prisma.booking.findMany({
            where: {
                userId: dto.userId
            }, include: {
                luggage: true,
                transport: true,
            },
        })


        return bookings;

    }

    async createBooking(dto: CreateBookingDto) {
        try {

            const booking = await this.prisma.booking.create({
                data: {
                    transportId: dto.transportId,
                    luggageId: dto.luggageId,
                    userId: dto.userId
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

    async rejectBooking(bookingId: number, attendant: User) {
        try {

            const booking = await this.prisma.booking.findUnique({
                where: {
                    id: bookingId
                }
            })

            if (!booking) throw new NotFoundException('No Booking Exists with that ID')

            const approvedBooking = await this.prisma.booking.update({
                where: {
                    id: bookingId
                },
                data: {
                    status: BookingStatus.REJECTED,
                    attendantId: attendant.id,
                }
            })

            return approvedBooking

        } catch (error) {
            throw error;

        }
    }

    async approveBooking(bookingId: number, attendant: User) {
        try {

            const booking = await this.prisma.booking.findUnique({
                where: {
                    id: bookingId
                }
            })

            if (!booking) throw new NotFoundException('No Booking Exists with that ID')

            const approvedBooking = await this.prisma.booking.update({
                where: {
                    id: bookingId
                },
                data: {
                    status: BookingStatus.ACCEPTED,
                    attendantId: attendant.id,
                    bookingVerificationCode: generateCustomCode()
                }
            })

            return approvedBooking

        } catch (error) {
            throw error;

        }
    }
}
