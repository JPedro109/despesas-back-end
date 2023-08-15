import {
  Query,
  Controller,
  Patch,
  BadRequestException,
  NotFoundException,
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
import { NotFoundError, UnauthorizedError } from '@/core/errors';
import { AbstractUserVerifyEmailUseCase } from '@/core/domain/users/abstracts';
import { UserVerifyEmailResponseDTO } from '@/core/domain/users/dtos';
import {
  ErrorDTO,
  InternalServerErrorDTO,
  UserVerifyEmailQueryDTO,
} from '@/infra/http/rest/dtos';

@ApiTags('Users')
@Controller('api/users')
export class UserVerifyEmailRestController {
  constructor(private readonly useCase: AbstractUserVerifyEmailUseCase) {}

  @ApiOperation({ summary: 'Verificar email' })
  @ApiResponse({
    status: 200,
    description: 'Rota de verificação de email',
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
  @Patch('verify-email')
  async handle(
    @Query() query: UserVerifyEmailQueryDTO,
  ): Promise<UserVerifyEmailResponseDTO> {
    const { email, code } = query;

    const response = await this.useCase.execute({
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
