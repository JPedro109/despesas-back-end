import {
  Body,
  Controller,
  BadRequestException,
  NotFoundException,
  HttpCode,
  Query,
  Patch,
} from '@nestjs/common';
import { NotFoundError } from '@/core/errors';
import { AbstractRecoverUserPasswordUseCase } from '@/core/domain/users/abstracts';
import { RecoverUserPasswordResponseDTO } from '@/core/domain/users/dtos';
import {
  RecoverUserPasswordQueryDTO,
  RecoverUserPasswordBodyDTO,
} from '@/infra/http/dtos';

@Controller('api/users')
export class RecoverUserPasswordController {
  constructor(private readonly _useCase: AbstractRecoverUserPasswordUseCase) {}

  @HttpCode(200)
  @Patch('password-recover')
  async handle(
    @Query()
    query: RecoverUserPasswordQueryDTO,
    @Body()
    body: RecoverUserPasswordBodyDTO,
  ): Promise<RecoverUserPasswordResponseDTO> {
    const { password, passwordConfirm } = body;
    const { email, code } = query;

    const response = await this._useCase.execute({
      email,
      code,
      password,
      passwordConfirm,
    });

    if (response instanceof NotFoundError)
      throw new NotFoundException(response.message, {
        cause: response,
        description: response.name,
      });

    if (response instanceof Error) {
      throw new BadRequestException(response.message, {
        cause: response,
        description: response.name,
      });
    }

    return Object(response);
  }
}
