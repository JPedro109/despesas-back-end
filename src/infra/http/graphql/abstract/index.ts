import { NotFoundError, UnauthorizedError } from '@/core/errors';
import { AbstractLogService } from '@/core/ports';
import { GraphQLError } from 'graphql';

export abstract class AbstractGraphQL {
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

  async handler(
    args: unknown,
    path: string,
    method: string,
    successStatusCode = 200,
  ) {
    const response = await this.useCase.execute(args);

    const log = (statusCode: number) => ({
      body: this.maskSensitiveBodyInformation(args as object),
      response,
      statusCode,
    });

    const pathFormated = path === '/' ? '/graphql' : path;

    if (response instanceof UnauthorizedError) {
      this.logService.warn(
        `${pathFormated} - ${method} - ${this.useCase.constructor.name}`,
        JSON.stringify(log(401)),
      );
      return new GraphQLError(response.message, {
        extensions: { code: response.name },
      });
    }

    if (response instanceof NotFoundError) {
      this.logService.warn(
        `${pathFormated} - ${method} - ${this.useCase.constructor.name}`,
        JSON.stringify(log(404)),
      );
      return new GraphQLError(response.message, {
        extensions: { code: response.name },
      });
    }

    if (response instanceof Error) {
      this.logService.warn(
        `${pathFormated} - ${method} - ${this.useCase.constructor.name}`,
        JSON.stringify(log(400)),
      );
      return new GraphQLError(response.message, {
        extensions: { code: response.name },
      });
    }

    this.logService.log(
      `${pathFormated} - ${method} - ${this.useCase.constructor.name}`,
      JSON.stringify(log(successStatusCode)),
    );

    return Object(response);
  }
}
