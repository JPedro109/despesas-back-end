import {
  ArgumentMetadata,
  BadRequestException,
  ValidationPipe,
} from '@nestjs/common';

export class ValidationPipeCustom extends ValidationPipe {
  public async transform(value: unknown, metadata: ArgumentMetadata) {
    try {
      return await super.transform(value, metadata);
    } catch (e) {
      if (e instanceof BadRequestException) {
        throw new BadRequestException({
          message: Object(e.getResponse()).message[0],
          error: 'Bad Request',
          statusCode: 400,
        });
      }
    }
  }
}
