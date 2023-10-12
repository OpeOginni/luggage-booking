import { Module } from '@nestjs/common';
import { LuggageController } from './luggage.controller';
import { LuggageService } from './luggage.service';


@Module({
    controllers: [LuggageController],
    providers: [LuggageService],
})
export class LuggageModule { }


