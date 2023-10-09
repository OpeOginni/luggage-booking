import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { LuggageController } from './luggage/luggage.controller';
import { LuggageModule } from './luggage/luggage.module';
import { TransportController } from './transport/transport.controller';
import { TransportModule } from './transport/transport.module';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true
  }), AuthModule, UserModule, PrismaModule, LuggageModule, TransportModule],
})
export class AppModule { }
