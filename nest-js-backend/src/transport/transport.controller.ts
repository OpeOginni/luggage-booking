import { Body, Controller, HttpCode, HttpStatus, Post, UsePipes } from '@nestjs/common';
import { TransportService } from './transport.service';
import { createTrasportSchema, CreateTransportDto } from './dto';
import { ZodValidationPipe } from 'src/utils/zodValidationPipe';

@Controller('transport')
export class TransportController {
    constructor(private transportService: TransportService) { }

    @Post('create')
    @UsePipes(new ZodValidationPipe(createTrasportSchema))
    createTransport(@Body() dto: CreateTransportDto) {
        return this.transportService.create(dto)
    }

}