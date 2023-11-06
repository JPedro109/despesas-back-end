import { NestFactory } from '@nestjs/core';
import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ENVIRONMENT, PORT, APP_URL, ValidationPipeCustom } from '@/shared';
import { AppModule } from '@/app.module';

export class Bootstrap {
  private static addCors(app: INestApplication) {
    app.enableCors({
      origin: (origin: string, callback: any) => {
        const allowList = [APP_URL];

        if (ENVIRONMENT === 'TEST') return callback(null, true);

        if (allowList.indexOf(origin) !== -1) return callback(null, true);

        callback(new Error('Not allowed cors'));
      },
    });
  }

  private static addPipes(app: INestApplication) {
    app.useGlobalPipes(new ValidationPipeCustom());
  }

  private static addDocumentation(app: INestApplication) {
    if (ENVIRONMENT == 'TEST') {
      SwaggerModule.setup(
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
      );
    }
  }

  static async execute() {
    const app = await NestFactory.create(AppModule);

    this.addCors(app);
    this.addPipes(app);
    this.addDocumentation(app);

    await app.listen(PORT || 3000);
  }
}
