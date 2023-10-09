import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateLuggageDto, UpdateLuggageDto } from './dto';
import { User, ManningStatus } from '@prisma/client';


@Injectable()
export class LuggageService {
    constructor(
        private prisma: PrismaService,
    ) { }

    async create(dto: CreateLuggageDto, user: User) {
        try {

            const currentUser = await this.prisma.user.findUnique({
                where: {
                    id: user.id
                }
            })

            if (!currentUser) throw new ForbiddenException('Credentials incorrect')

            const mannedStatus = dto.manned ? ManningStatus.MANNED : ManningStatus.UNMANNED;

            const luggage = await this.prisma.luggage.create({
                data: {
                    userId: currentUser.id,
                    size: dto.size,
                    images: dto.images,
                    items: dto.items,
                    manningStatus: mannedStatus,
                    lauggageTransportId: dto.transportId,
                },
            })

            return { success: true, luggage };

        } catch (error) {
            throw error;
        }
    }


    async update(dto: UpdateLuggageDto, user: User) {
        try {

            const currentUser = await this.prisma.user.findUnique({
                where: {
                    id: user.id
                }
            })

            if (!currentUser) throw new ForbiddenException('Credentials incorrect')

            const mannedStatus = dto.manned ? ManningStatus.MANNED : ManningStatus.UNMANNED;

            const updatedLuggage = await this.prisma.luggage.update({
                where: {
                    id: dto.luggageId
                },
                data: {
                    size: dto.size,
                    images: dto.images,
                    items: dto.items,
                    manningStatus: mannedStatus,
                    lauggageTransportId: dto.transportId,
                },
            })

            return { success: true, updatedLuggage };

        } catch (error) {
            throw error;
        }
    }


}
