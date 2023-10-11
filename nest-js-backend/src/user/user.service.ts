import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateUserDto, updateUserSchema } from './dto';
import * as argon from 'argon2'
import { User } from '@prisma/client';


@Injectable()
export class UserService {
    constructor(
        private prisma: PrismaService,
    ) { }

    async update(dto: UpdateUserDto, user: User) {
        try {

            const hash = await argon.hash(dto.password)

            const updatedUser = await this.prisma.user.update({
                where: {
                    id: user.id
                },
                data: {
                    firstName: dto.firstName,
                    lastName: dto.lastName,
                    passwordHash: hash

                }
            })

            return { success: true, updatedUser };

        } catch (error) {
            throw error;
        }
    }


}
