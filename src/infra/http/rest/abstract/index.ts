import { NotFoundError, UnauthorizedError } from '@/core/errors';
import { AbstractLogService } from '@/core/ports';
import {
  BadRequestException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';

export abstract class AbstractRest {
  constructor(
    protected readonly useCase: {
      execute: (args: unknown) => Promise<unknown>;
    },
    protected readonly logService: AbstractLogService,
  ) {}

  private maskSensitiveBodyInformation(data: object) {
    for (const key in data)
      if (key.includes('password') || key.includes('Password'))
        data[key] = '********';

    return data;
  }

  async handler(args: unknown, path: string, method: string) {
    const response = await this.useCase.execute(args);

    const log = (statusCode: number) => ({
      body: this.maskSensitiveBodyInformation(args as object),
      response,
      statusCode,
    });

    if (response instanceof UnauthorizedError) {
      this.logService.warn(
        `${path} - ${method} - ${this.useCase.constructor.name}`,
        JSON.stringify(log(401)),
      );
      throw new UnauthorizedException(response.message, {
        cause: response,
        description: response.name,
      });
    }

    if (response instanceof NotFoundError) {
      this.logService.warn(
        `${path} - ${method} - ${this.useCase.constructor.name}`,
        JSON.stringify(log(404)),
      );
      throw new NotFoundException(response.message, {
        cause: response,
        description: response.name,
      });
    }

    if (response instanceof Error) {
      this.logService.warn(
        `${path} - ${method} - ${this.useCase.constructor.name}`,
        JSON.stringify(log(400)),
      );
      throw new BadRequestException(response.message, {
        cause: response,
        description: response.name,
      });
    }

    return Object(response);
  }
}
