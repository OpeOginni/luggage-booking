import { Body, Controller, Param, Patch, Post, Req, UseGuards, UsePipes } from '@nestjs/common';

import { ZodValidationPipe } from 'src/utils/zodValidationPipe';
import { LuggageService } from './luggage.service';
import { CreateLuggageDto, DeleteLuggageDto, UpdateLuggageDto, createLuggageSchema, deleteLuggageSchema, updateLuggageSchema } from './dto';
import { GetUser, GetUserId } from 'src/auth/decorator';
import { User } from '@prisma/client';
import { BookingService } from 'src/booking/booking.service';
import { CreateBookingDto } from 'src/booking/dto';
import { JwtGuard, RolesGuard } from 'src/auth/guard';
import { createTrasportSchema } from 'src/transport/dto';
import { userSchema } from 'prisma/prisma.dto';

@UseGuards(JwtGuard, RolesGuard)
@Controller('luggage')
export class LuggageController {
    constructor(private luggageService: LuggageService) { }

    @Post('create')
    @UsePipes(new ZodValidationPipe({ body: createLuggageSchema, custom: userSchema }))
    createLuggage(@Body() dto: CreateLuggageDto, @GetUser() user: User,) {
        console.log(user)

        return this.luggageService.create(dto, user)
    }

    @Patch('update')
    @UsePipes(new ZodValidationPipe({ body: updateLuggageSchema }))
    updateLuggage(@Body() dto: UpdateLuggageDto, @GetUser() user: User) {
        return this.luggageService.update(dto, user)
    }

    @Patch('delete')
    @UsePipes(new ZodValidationPipe({ param: deleteLuggageSchema }))
    deleteLuggage(@Param() dto: DeleteLuggageDto, @GetUser() user: User) {
        return this.luggageService.delete(dto, user)
    }

}