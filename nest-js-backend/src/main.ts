import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const port = process.env.PORT || 3333;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  if(!process.env.PORT) {
    // DEV CONGIG
    await app.listen(port);
  } else {
    // RAILWAY CONFIG
    await app.listen(port, "0.0.0.0");
  }





}
bootstrap();
