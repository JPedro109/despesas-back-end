import {
  Body,
  Controller,
  BadRequestException,
  NotFoundException,
  HttpCode,
  Query,
  Patch,
} from '@nestjs/common';
import {
  ApiExtraModels,
  ApiOperation,
  ApiResponse,
  ApiTags,
  getSchemaPath,
} from '@nestjs/swagger';
import { NotFoundError } from '@/core/errors';
import { AbstractRecoverUserPasswordUseCase } from '@/core/domain/users/abstracts';
import { RecoverUserPasswordResponseDTO } from '@/core/domain/users/dtos';
import {
  RecoverUserPasswordQueryDTO,
  RecoverUserPasswordBodyDTO,
  ErrorDTO,
  InternalServerErrorDTO,
} from '@/infra/http/rest/dtos';

@ApiTags('Users')
@Controller('api/users')
export class RecoverUserPasswordController {
  constructor(private readonly useCase: AbstractRecoverUserPasswordUseCase) {}

  @ApiOperation({ summary: 'Recuperar senha do usuário.' })
  @ApiResponse({
    status: 201,
    description: 'Rota de recuperação de senha do usuário',
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
    status: 404,
    schema: {
      $ref: getSchemaPath(ErrorDTO),
    },
    description: 'Usuário não encontrado',
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
  @Patch('password-recover')
  async handle(
    @Query()
    query: RecoverUserPasswordQueryDTO,
    @Body()
    body: RecoverUserPasswordBodyDTO,
  ): Promise<RecoverUserPasswordResponseDTO> {
    const { password, passwordConfirm } = body;
    const { email, code } = query;

    const response = await this.useCase.execute({
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
