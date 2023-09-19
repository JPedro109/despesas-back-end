import { NestFactory } from '@nestjs/core';
import { ConsoleLogger } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import {
  ENVIRONMENT,
  PORT,
  APP_URL,
  ValidationPipeCustom,
  LoggerCustom,
} from '@/shared';
import { AbstractLogRepository } from '@/core/ports';
import { AppModule } from '@/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: (origin: string, callback: any) => {
      const allowList = [APP_URL];

      if (ENVIRONMENT === 'TEST') return callback(null, true);

      if (allowList.indexOf(origin) !== -1) return callback(null, true);

      callback(new Error('Not allowed cors'));
    },
  });

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

  await app.listen(PORT || 3000);
}
bootstrap();
