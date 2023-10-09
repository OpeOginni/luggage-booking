import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTransportDto } from './dto';


@Injectable()
export class TransportService {
    constructor(
        private prisma: PrismaService,
    ) { }

    async create(dto: CreateTransportDto) {

        // save the new user in the db
        try {
            const transport = await this.prisma.transport.create({
                data: {
                    departure: new Date(dto.departure),
                },
            })
            return { success: true, transport };

        } catch (error) {
            throw error;
        }

    }


}
