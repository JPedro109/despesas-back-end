import {
  Query,
  Controller,
  Patch,
  BadRequestException,
  NotFoundException,
  UnauthorizedException,
  HttpCode,
} from '@nestjs/common';
import { NotFoundError, UnauthorizedError } from '@/core/errors';
import { AbstractUserVerifyEmailUseCase } from '@/core/domain/users/abstracts';
import { UserVerifyEmailResponseDTO } from '@/core/domain/users/dtos';
import { UserVerifyEmailQueryDTO } from '@/infra/http/dtos';

@Controller('api/users')
export class UserVerifyEmailController {
  constructor(private readonly _useCase: AbstractUserVerifyEmailUseCase) {}

  @HttpCode(200)
  @Patch('verify-email')
  async handle(
    @Query() query: UserVerifyEmailQueryDTO,
  ): Promise<UserVerifyEmailResponseDTO> {
    const { email, code } = query;

    const response = await this._useCase.execute({
      email,
      code,
    });

    if (response instanceof NotFoundError)
      throw new NotFoundException(response.message, {
        cause: response,
        description: response.name,
      });

    if (response instanceof UnauthorizedError)
      throw new UnauthorizedException(response.message, {
        cause: response,
        description: response.name,
      });

    if (response instanceof Error)
      throw new BadRequestException(response.message, {
        cause: response,
        description: response.name,
      });

    return Object(response);
  }
}
