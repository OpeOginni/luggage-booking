import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { LuggageController } from './luggage/luggage.controller';
import { LuggageModule } from './luggage/luggage.module';
import { TransportController } from './transport/transport.controller';
import { TransportModule } from './transport/transport.module';
import { ACGuard, AccessControlModule } from 'nest-access-control';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './auth/guard/roles.guard';
import { JwtGuard } from './auth/guard';
import { BookingModule } from './booking/booking.module';
import { AdminModule } from './admin/admin.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    UserModule,
    PrismaModule,
    LuggageModule,
    TransportModule,
    BookingModule,
    AdminModule
  ]
})
export class AppModule { }
