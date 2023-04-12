import { NestFactory } from '@nestjs/core';
import { ConsoleLogger } from '@nestjs/common';
import {
  ValidationPipeCustom,
  LoggerCustom,
  AbstractLogRepository,
} from '@/custom';
import { AppModule } from '@/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();

  app.useLogger(
    new LoggerCustom(
      new ConsoleLogger(),
      app.get<AbstractLogRepository>(AbstractLogRepository),
    ),
  );

  app.useGlobalPipes(new ValidationPipeCustom());

  await app.listen(3000);
}
bootstrap();
