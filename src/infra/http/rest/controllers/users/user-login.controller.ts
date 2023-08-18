import {
  Body,
  Controller,
  Post,
  UnauthorizedException,
  HttpCode,
} from '@nestjs/common';
import {
  ApiExtraModels,
  ApiOperation,
  ApiResponse,
  ApiTags,
  getSchemaPath,
} from '@nestjs/swagger';
import { UnauthorizedError } from '@/core/errors';
import { AbstractUserLoginUseCase } from '@/core/domain/users/abstracts';
import { UserLoginResponseDTO } from '@/core/domain/users/dtos';
import {
  ErrorDTO,
  InternalServerErrorDTO,
  UserLoginBodyDTO,
} from '@/infra/http/rest/dtos';

@ApiTags('Users')
@Controller('api/users')
export class UserLoginController {
  constructor(private readonly useCase: AbstractUserLoginUseCase) {}

  @ApiOperation({ summary: 'Atualizar senha' })
  @ApiResponse({
    status: 200,
    description: 'Rota de atualização de senha',
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
  @ApiResponse({
    status: 401,
    schema: {
      $ref: getSchemaPath(ErrorDTO),
    },
    description: 'Usuário não autorizado',
  })
  @ApiExtraModels(InternalServerErrorDTO)
  @ApiResponse({
    status: 500,
    schema: {
      $ref: getSchemaPath(InternalServerErrorDTO),
    },
    description: 'Erro no servidor',
  })
  @HttpCode(200)
  @Post('login')
  async handle(@Body() body: UserLoginBodyDTO): Promise<UserLoginResponseDTO> {
    const { email, password } = body;

    const response = await this.useCase.execute({
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
