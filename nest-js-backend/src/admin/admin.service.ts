import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import * as argon from 'argon2'
import { CreateSuperRoleDto, GetAllUsersDto, GetUserDto } from './dto/admin.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Role } from 'src/auth/enums';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class AdminService {
    constructor(
        private prisma: PrismaService,
    ) { }

    async createAttendant(dto: CreateSuperRoleDto) {
        const hash = await argon.hash(dto.password)

        try {
            const attendant = await this.prisma.user.create({
                data: {
                    email: dto.email,
                    passwordHash: hash,
                    firstName: dto.firstName,
                    lastName: dto.lastName,
                    role: Role.LUGGAGE_ATTENDANT,
                }
            })

            return attendant;

        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    throw new ForbiddenException('Credentials Taken')
                }
            }
            throw error;
        }
    }

    async createPersonnel(dto: CreateSuperRoleDto) {
        const hash = await argon.hash(dto.password)

        try {
            const personnel = await this.prisma.user.create({
                data: {
                    email: dto.email,
                    passwordHash: hash,
                    firstName: dto.firstName,
                    lastName: dto.lastName,
                    role: Role.CHECK_IN_PERSONNEL,
                }
            })

            return personnel;
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    throw new ForbiddenException('Credentials Taken')
                }
            }
            throw error;
        }
    }

    async getUser(dto: GetUserDto) {
        try {

            // This takes the function if the role requested is a Personnel, Admin or Attendant
            const user = await this.prisma.user.findUnique({
                where: {
                    id: dto.userId
                }
            })

            if (!user) throw new BadRequestException('Incorrect Credential')

            return user
        } catch (error) {
            console.log(error)

            return error
        }
    }

    async getAllUsersWithRole(dto: GetAllUsersDto) {
        try {

            // dto.role

            // This takes the function if the role requested is a Personnel, Admin or Attendant
            const users = await this.prisma.user.findMany({
                where: {
                    role: dto.role
                }
            })

            return users
        } catch (error) {

            console.log(error)
            return error
        }
    }


    async getAllUsers() {
        try {
            const users = await this.prisma.user.findMany({})

            return users


        } catch (error) {

            console.log(error)
            return error
        }
    }
}
