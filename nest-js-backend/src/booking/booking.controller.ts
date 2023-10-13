import { Body, Controller, Get, Param, ParseEnumPipe, ParseIntPipe, Patch, Post, Query, UseGuards, UsePipes } from '@nestjs/common';
import { JwtGuard } from 'src/auth/guard';
import { RolesGuard } from 'src/auth/guard/roles.guard';
import { BookingService } from './booking.service';
import { Roles } from 'src/auth/decorator/get-role.decorator';
import { BookingStatus, Role } from 'src/auth/enums';
import { ZodValidationPipe } from 'src/utils/zodValidationPipe';
import { ApproveBookingDto, GetBookingDto, approveBookingSchema, getBookingSchema } from './dto';
import { GetUser } from 'src/auth/decorator';
import { User } from '@prisma/client';
import { userSchema } from 'prisma/prisma.dto';

@UseGuards(JwtGuard, RolesGuard)
@Controller('bookings')
export class BookingController {
    constructor(private bookingService: BookingService) { }

    @Get('me')
    @UsePipes(new ZodValidationPipe({ custom: userSchema }))
    getMyBookings(@GetUser() user: User) {
        return this.bookingService.myBookings({ userId: user.id })
    }

    @Roles(Role.LUGGAGE_ATTENDANT, Role.ADMIN)
    @Get('approve-booking/:bookingId')
    @UsePipes(new ZodValidationPipe({ custom: userSchema }))
    approveBooking(@Param('bookingId', ParseIntPipe,) bookingId: number, @GetUser() attendant: User) {
        return this.bookingService.approveBooking(bookingId, attendant)
    }

    @Roles(Role.LUGGAGE_ATTENDANT, Role.ADMIN)
    @Get('reject-booking/:bookingId')
    @UsePipes(new ZodValidationPipe({ custom: userSchema }))
    rejectBooking(@Param('bookingId', ParseIntPipe,) bookingId: number, @GetUser() attendant: User) {
        return this.bookingService.rejectBooking(bookingId, attendant)
    }

    @Roles(Role.LUGGAGE_ATTENDANT, Role.ADMIN, Role.CHECK_IN_PERSONNEL)
    @Get('query')
    getAllBookingsWithQuery(@Query('status', new ParseEnumPipe(BookingStatus, { errorHttpStatusCode: 400 })) status?: BookingStatus) {
        return this.bookingService.getAllBookingsWithQuery(status)
    }

    @Roles(Role.LUGGAGE_ATTENDANT, Role.ADMIN, Role.CHECK_IN_PERSONNEL)
    @Get()
    getAllBookings() {
        return this.bookingService.getAllBookings()
    }

    @Roles(Role.LUGGAGE_ATTENDANT, Role.ADMIN, Role.CHECK_IN_PERSONNEL)
    @Get(':bookingId')
    getBooking(@Param('bookingId', ParseIntPipe,) bookingId: number) {

        const dto: GetBookingDto = {
            bookingId
        }
        return this.bookingService.getBooking(dto)
    }

}
