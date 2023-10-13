import { Controller, Get } from '@nestjs/common';

@Controller('health-check')
export class HealthCheckController {

    @Get()
    healthCheck() {
        return { success: true, message: "Server is up and running" }
    }

    @Get('info')
    serverInfo() {
        return { success: true, title: "Luggage Booking Server", version: "1.0.0", author: "Opeyemi Oginni" }
    }
}
