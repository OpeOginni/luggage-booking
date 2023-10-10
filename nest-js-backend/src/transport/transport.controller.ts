import { Body, Controller, HttpCode, HttpStatus, Post, UseGuards, UsePipes } from '@nestjs/common';
import { TransportService } from './transport.service';
import { createTrasportSchema, CreateTransportDto } from './dto';
import { ZodValidationPipe } from 'src/utils/zodValidationPipe';
import { UseRoles } from 'nest-access-control';
import { GetUser } from 'src/auth/decorator';
import { User } from '@prisma/client';
import { Roles } from 'src/auth/decorator/get-role.decorator';
import { Role } from 'src/auth/enums';
import { JwtGuard } from 'src/auth/guard';
import { RolesGuard } from 'src/auth/guard/roles.guard';

@UseGuards(JwtGuard, RolesGuard)
@Controller('transport')
export class TransportController {
    constructor(private transportService: TransportService) { }

    @Roles(Role.ADMIN)
    @Post('create')
    @UsePipes(new ZodValidationPipe(createTrasportSchema))
    createTransport(@Body() dto: CreateTransportDto) {
        return this.transportService.create(dto)
    }

}