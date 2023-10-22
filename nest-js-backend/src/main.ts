import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const port = process.env.PORT || 3333;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  // RAILWAY CONFIG
  // await app.listen(port, "0.0.0.0");

  // DEV CONGIG
  await app.listen(port);

}
bootstrap();
