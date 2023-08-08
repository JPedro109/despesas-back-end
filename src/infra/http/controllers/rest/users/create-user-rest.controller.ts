import {
  Body,
  Controller,
  Post,
  BadRequestException,
  HttpCode,
} from '@nestjs/common';
import {
  ApiExtraModels,
  ApiOperation,
  ApiResponse,
  ApiTags,
  getSchemaPath,
} from '@nestjs/swagger';
import { AbstractCreateUserUseCase } from '@/core/domain/users/abstracts';
import { CreateUserResponseDTO } from '@/core/domain/users/dtos';
import {
  CreateUserBodyDTO,
  ErrorDTO,
  InternalServerErrorDTO,
} from '@/infra/http/dtos';

@ApiTags('Users')
@Controller('api/users')
export class CreateUserRestController {
  constructor(private readonly useCase: AbstractCreateUserUseCase) {}

  @ApiOperation({ summary: 'Criar usuário' })
  @ApiResponse({
    status: 201,
    description: 'Rota de criação de usuário',
    type: String,
  })
  @ApiExtraModels(ErrorDTO)
  @ApiResponse({
    status: 400,
    schema: {
      $ref: getSchemaPath(ErrorDTO),
    },
    description: 'DTO inválido ou erro na regras de negócio',
  })
  @ApiExtraModels(InternalServerErrorDTO)
  @ApiResponse({
    status: 500,
    description: 'Erro no servidor',
    schema: {
      $ref: getSchemaPath(InternalServerErrorDTO),
    },
  })
  @HttpCode(201)
  @Post()
  async handle(
    @Body() body: CreateUserBodyDTO,
  ): Promise<CreateUserResponseDTO> {
    const { email, password, passwordConfirm } = body;

    const response = await this.useCase.execute({
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
