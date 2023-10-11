import { Body, Controller, Get, Param, Post, UseGuards, UsePipes } from '@nestjs/common';
import { JwtGuard } from 'src/auth/guard';
import { RolesGuard } from 'src/auth/guard/roles.guard';
import { BookingService } from './booking.service';
import { Roles } from 'src/auth/decorator/get-role.decorator';
import { Role } from 'src/auth/enums';
import { ZodValidationPipe } from 'src/utils/zodValidationPipe';
import { ApproveBookingDto, GetBookingDto, approveBookingSchema } from './dto';

@UseGuards(JwtGuard, RolesGuard)
@Controller('booking')
export class BookingController {
    constructor(private bookingService: BookingService) { }

    @Roles(Role.LUGGAGE_ATTENDANT, Role.ADMIN)
    @Post('approve-booking')
    @UsePipes(new ZodValidationPipe(approveBookingSchema))
    updateBookingStatus(@Body() dto: ApproveBookingDto) {
        return this.bookingService.updateBookingStatus(dto)
    }

    @Roles(Role.LUGGAGE_ATTENDANT, Role.ADMIN, Role.CHECK_IN_PERSONNEL)
    @Get()
    getAllBookings() {
        return this.bookingService.getAllBookings()
    }

    @Roles(Role.LUGGAGE_ATTENDANT, Role.ADMIN, Role.CHECK_IN_PERSONNEL)
    @Get(':bookingId')
    getBooking(@Param('bookingId') _bookingId: number) {

        const dto: GetBookingDto = {
            bookingId: _bookingId
        }
        return this.bookingService.getBooking(dto)
    }

}
