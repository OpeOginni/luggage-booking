import { BadRequestException, ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTransportDto, GetTransportDto } from './dto';


@Injectable()
export class TransportService {
    constructor(
        private prisma: PrismaService,
    ) { }

    async create(dto: CreateTransportDto) {

        try {
            const transport = await this.prisma.transport.create({
                data: {
                    departure: new Date(dto.departure),
                    transportCode: dto.transportCode,
                    transportType: dto.transportType,
                    destination: dto.destination,
                    maxBookingSlots: dto.maxBookingSlots,
                },
            })
            return { success: true, transport };

        } catch (error) {
            throw error;
        }

    }

    async getAllTransports() {
        try {
            const transports = await this.prisma.transport.findMany({})

            return transports;
        } catch (error) {

            throw error;
        }
    }

    async getTransport(dto: GetTransportDto) {

        const transport = await this.prisma.transport.findUnique({
            where: {
                id: dto.transportId
            }
        })

        if (!transport) throw new BadRequestException('No Trasnport Exists with that ID')

        return transport;

    }


}
