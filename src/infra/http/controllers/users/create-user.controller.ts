import {
  Body,
  Controller,
  Post,
  BadRequestException,
  HttpCode,
} from '@nestjs/common';
import { AbstractCreateUserUseCase } from '@/core/domain/users/abstracts';
import { CreateUserResponseDTO } from '@/core/domain/users/dtos';
import { CreateUserBodyDTO } from '@/infra/http/dtos';

@Controller('api/users')
export class CreateUserController {
  constructor(private readonly _useCase: AbstractCreateUserUseCase) {}

  @HttpCode(201)
  @Post()
  async handle(
    @Body() body: CreateUserBodyDTO,
  ): Promise<CreateUserResponseDTO> {
    const { email, password, passwordConfirm } = body;

    const response = await this._useCase.execute({
      email,
      password,
      passwordConfirm,
    });

    if (response instanceof Error)
      throw new BadRequestException(response.message, {
        cause: response,
        description: response.name,
      });

    return Object(response);
  }
}
