import { Body, Controller, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, UseGuards, UsePipes } from '@nestjs/common';
import { TransportService } from './transport.service';
import { createTrasportSchema, CreateTransportDto, GetTransportDto } from './dto';
import { ZodValidationPipe } from 'src/utils/zodValidationPipe';
import { UseRoles } from 'nest-access-control';
import { GetUser } from 'src/auth/decorator';
import { User } from '@prisma/client';
import { Roles } from 'src/auth/decorator/get-role.decorator';
import { Role } from 'src/auth/enums';
import { JwtGuard } from 'src/auth/guard';
import { RolesGuard } from 'src/auth/guard/roles.guard';
import { createLuggageSchema } from 'src/luggage/dto';

@UseGuards(JwtGuard, RolesGuard)
@Controller('transport')
export class TransportController {
    constructor(private transportService: TransportService) { }

    @Roles(Role.ADMIN)
    @Post('create')
    @UsePipes(new ZodValidationPipe({ body: createTrasportSchema }))
    createTransport(@Body() dto: CreateTransportDto) {
        return this.transportService.create(dto)
    }

    @Roles(Role.LUGGAGE_ATTENDANT, Role.ADMIN, Role.CHECK_IN_PERSONNEL, Role.USER)
    @Get()
    getAllTransports() {
        return this.transportService.getAllTransports()
    }

    @Roles(Role.LUGGAGE_ATTENDANT, Role.ADMIN, Role.CHECK_IN_PERSONNEL, Role.USER)
    @Get(':transportId')
    getBooking(@Param('transportId', ParseIntPipe,) transportId: number) {

        const dto: GetTransportDto = {
            transportId
        }
        return this.transportService.getTransport(dto)
    }

}