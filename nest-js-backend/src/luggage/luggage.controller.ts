import { Body, Controller, Patch, Post, Req, UsePipes } from '@nestjs/common';

import { ZodValidationPipe } from 'src/utils/zodValidationPipe';
import { LuggageService } from './luggage.service';
import { CreateLuggageDto, DeleteLuggageDto, UpdateLuggageDto, createLuggageSchema, deleteLuggageSchema } from './dto';
import { GetUser } from 'src/auth/decorator';
import { User } from '@prisma/client';
import { BookingService } from 'src/booking/booking.service';
import { CreateBookingDto } from 'src/booking/dto';


@Controller('luggage')
export class LuggageController {
    constructor(private luggageService: LuggageService, private bookingService: BookingService) { }

    @Post('create')
    @UsePipes(new ZodValidationPipe(createLuggageSchema))
    createLuggage(@Body() dto: CreateLuggageDto, @GetUser() user: User) {



        return this.luggageService.create(dto, user)
    }

    @Patch('update')
    @UsePipes(new ZodValidationPipe(createLuggageSchema))
    updateLuggage(@Body() dto: UpdateLuggageDto, @GetUser() user: User) {
        return this.luggageService.update(dto, user)
    }

    @Patch('delete')
    @UsePipes(new ZodValidationPipe(deleteLuggageSchema))
    deleteLuggage(@Req() dto: DeleteLuggageDto, @GetUser() user: User) {
        return this.luggageService.delete(dto, user)
    }

}