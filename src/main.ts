import { NestFactory } from '@nestjs/core';
import { ConsoleLogger } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import {
  ENVIRONMENT,
  PORT,
  ValidationPipeCustom,
  LoggerCustom,
} from '@/shared';
import { AbstractLogRepository } from '@/core/ports';
import { AppModule } from '@/app.module';
import { QueueHelper } from '@/infra/queue/helper';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();

  ENVIRONMENT == 'TEST'
    ? SwaggerModule.setup(
        'api/docs',
        app,
        SwaggerModule.createDocument(
          app,
          new DocumentBuilder()
            .addBearerAuth()
            .setTitle('Api de Despesas')
            .setDescription('Aplicação voltada para gerenciamento de despesas')
            .setVersion('1.0.0')
            .build(),
        ),
      )
    : null;

  app.useLogger(
    new LoggerCustom(
      new ConsoleLogger(),
      app.get<AbstractLogRepository>(AbstractLogRepository),
    ),
  );

  app.useGlobalPipes(new ValidationPipeCustom());

  await QueueHelper.connect();
  await app.listen(PORT || 3000);
}
bootstrap();
