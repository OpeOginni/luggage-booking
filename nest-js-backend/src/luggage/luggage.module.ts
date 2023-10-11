import { Module } from '@nestjs/common';
import { LuggageController } from './luggage.controller';
import { LuggageService } from './luggage.service';
import { BookingService } from 'src/booking/booking.service';


@Module({
    controllers: [LuggageController],
    providers: [LuggageService, BookingService],
})
export class LuggageModule {

}


