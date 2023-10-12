import { Body, Controller, HttpCode, HttpStatus, Post, UsePipes } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto, CreateAuthDto, createAuthSchema } from './dto';
import { ZodValidationPipe } from 'src/utils/zodValidationPipe';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('signup')
    @UsePipes(new ZodValidationPipe({ body: createAuthSchema }))
    signup(@Body() dto: CreateAuthDto) {
        return this.authService.signup(dto)
    }

    @HttpCode(HttpStatus.OK)
    @Post('signin')
    signin(@Body() dto: AuthDto) {

        return this.authService.signin(dto)

    }
}