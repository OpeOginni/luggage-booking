import { Body, Controller, Post, UseGuards, UsePipes } from '@nestjs/common';

import { ZodValidationPipe } from 'src/utils/zodValidationPipe';
import { AdminService } from './admin.service';
import { JwtGuard } from 'src/auth/guard';
import { RolesGuard } from 'src/auth/guard/roles.guard';
import { Role } from 'src/auth/enums';
import { createSuperRoleSchema, CreateSuperRoleDto } from './dto';
import { Roles } from 'src/auth/decorator/get-role.decorator';

@UseGuards(JwtGuard, RolesGuard)
@Controller('admin')
export class AdminController {
    constructor(private adminService: AdminService) { }

    @Roles(Role.ADMIN)
    @Post('create-attendant')
    @UsePipes(new ZodValidationPipe(createSuperRoleSchema))
    createAttendant(@Body() dto: CreateSuperRoleDto) {
        return this.adminService.createAttendant(dto)
    }

    @Roles(Role.ADMIN)
    @Post('create-personnel')
    @UsePipes(new ZodValidationPipe(createSuperRoleSchema))
    createPersonnel(@Body() dto: CreateSuperRoleDto) {
        return this.adminService.createPersonnel(dto)
    }
}
