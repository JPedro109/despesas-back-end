import {
  Body,
  Controller,
  Post,
  UnauthorizedException,
  HttpCode,
} from '@nestjs/common';
import { UnauthorizedError } from '@/core/errors';
import { AbstractUserLoginUseCase } from '@/core/domain/users/abstracts';
import { UserLoginResponseDTO } from '@/core/domain/users/dtos';
import { UserLoginBodyDTO } from '@/infra/http/dtos';

@Controller('api/users')
export class UserLoginController {
  constructor(private readonly _useCase: AbstractUserLoginUseCase) {}

  @HttpCode(200)
  @Post('login')
  async handle(@Body() body: UserLoginBodyDTO): Promise<UserLoginResponseDTO> {
    const { email, password } = body;

    const response = await this._useCase.execute({
      email,
      password,
    });

    if (response instanceof UnauthorizedError)
      throw new UnauthorizedException(response.message, {
        cause: response,
        description: response.name,
      });

    return Object(response);
  }
}
