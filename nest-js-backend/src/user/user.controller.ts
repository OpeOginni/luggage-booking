import { Body, Controller, Get, Patch, Req, UseGuards, UsePipes } from '@nestjs/common';
import { User } from '@prisma/client';
import { Request } from 'express';
import { GetUser } from 'src/auth/decorator';
import { JwtGuard } from 'src/auth/guard';
import { UserService } from './user.service';
import { ZodValidationPipe } from 'src/utils/zodValidationPipe';
import { UpdateUserDto, updateUserSchema } from './dto';

@UseGuards(JwtGuard)
@Controller('users')
export class UserController {
    constructor(private userService: UserService) { }

    @Get('me')
    getMe(@GetUser() user: User) {
        return user
    }

    @Patch()
    @UsePipes(new ZodValidationPipe(updateUserSchema))
    editUser(@Body() dto: UpdateUserDto, @GetUser() user: User) {
        return this.userService.update(dto, user)
    }
}
