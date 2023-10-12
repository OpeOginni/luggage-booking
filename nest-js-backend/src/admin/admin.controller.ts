import { Body, Controller, Get, Param, ParseEnumPipe, ParseIntPipe, Post, UseGuards, UsePipes } from '@nestjs/common';

import { ZodValidationPipe } from 'src/utils/zodValidationPipe';
import { AdminService } from './admin.service';
import { JwtGuard } from 'src/auth/guard';
import { RolesGuard } from 'src/auth/guard/roles.guard';
import { Role } from 'src/auth/enums';
import { createSuperRoleSchema, CreateSuperRoleDto, getAllUsersSchema, GetAllUsersDto, getUserSchema, GetUserDto } from './dto';
import { Roles } from 'src/auth/decorator/get-role.decorator';

@UseGuards(JwtGuard, RolesGuard)
@Controller('admin')
export class AdminController {
    constructor(private adminService: AdminService) { }

    @Roles(Role.ADMIN)
    @Post('create-attendant')
    @UsePipes(new ZodValidationPipe({ body: createSuperRoleSchema }))
    createAttendant(@Body() dto: CreateSuperRoleDto) {
        return this.adminService.createAttendant(dto)
    }

    @Roles(Role.ADMIN)
    @Post('create-personnel')
    @UsePipes(new ZodValidationPipe({ body: createSuperRoleSchema }))
    createPersonnel(@Body() dto: CreateSuperRoleDto) {
        return this.adminService.createPersonnel(dto)
    }

    @Roles(Role.ADMIN)
    @Get('all-users')
    getAllUsers() {
        return this.adminService.getAllUsers()
    }

    @Roles(Role.ADMIN)
    @Get('all-users/:role')
    getAllUsersWithRole(@Param('', new ZodValidationPipe({ param: getAllUsersSchema })) dto: GetAllUsersDto) {
        return this.adminService.getAllUsersWithRole(dto)
    }

    @Roles(Role.ADMIN)
    @Get('user/:userId')
    getUser(@Param('userId', ParseIntPipe) userId: number) {

        const dto: GetUserDto = {
            userId
        }
        return this.adminService.getUser(dto)
    }
}
