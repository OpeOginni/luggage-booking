import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateLuggageDto, DeleteLuggageDto, UpdateLuggageDto } from './dto';
import { User } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';


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


            const luggage = await this.prisma.luggage.create({
                data: {
                    userId: currentUser.id,
                    size: dto.size,
                    images: dto.images,
                    items: dto.items,
                    dangerousItems: dto.dangerousItems,
                    recieverName: dto.recieverName,
                },
            })


            const booking = await this.prisma.booking.create({
                data: {
                    transportId: dto.transportId,
                    luggageId: luggage.id
                }
            })

            return { success: true, luggage, booking };

        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    throw new ForbiddenException('Credentials Taken')
                }
            }
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


            const updatedLuggage = await this.prisma.luggage.update({
                where: {
                    id: dto.luggageId
                },
                data: {
                    size: dto.size,
                    images: dto.images,
                    items: dto.items,
                    dangerousItems: dto.dangerousItems,
                    recieverName: dto.recieverName,
                },
            })

            return { success: true, updatedLuggage };

        } catch (error) {
            throw error;
        }
    }

    async delete(dto: DeleteLuggageDto, user: User) {
        try {

            const currentUser = await this.prisma.user.findUnique({
                where: {
                    id: user.id
                }
            })

            if (!currentUser) throw new ForbiddenException('Credentials incorrect')

            // Delete Booking
            await this.prisma.booking.delete({
                where: {
                    luggageId: dto.luggageId
                }
            })

            // Delete Luggage
            await this.prisma.luggage.delete({
                where: {
                    id: dto.luggageId
                }
            })

            return { success: true, };

        } catch (error) {
            throw error;
        }
    }

}
