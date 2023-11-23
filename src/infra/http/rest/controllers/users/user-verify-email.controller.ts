import { Query, Controller, Patch, HttpCode, Req } from '@nestjs/common';
import {
  ApiExtraModels,
  ApiOperation,
  ApiResponse,
  ApiTags,
  getSchemaPath,
} from '@nestjs/swagger';
import { AbstractLogService } from '@/core/ports';
import { AbstractUserVerifyEmailUseCase } from '@/core/domain/users/abstracts';
import {
  ErrorDTO,
  InternalServerErrorDTO,
  UserVerifyEmailQueryDTO,
} from '@/infra/http/rest/dtos';
import { AbstractRest } from '@/infra/http/rest/abstract';

@ApiTags('Users')
@Controller('api/users')
export class UserVerifyEmailController extends AbstractRest {
  constructor(
    protected readonly useCase: AbstractUserVerifyEmailUseCase,
    protected readonly logService: AbstractLogService,
  ) {
    super(useCase, logService);
  }

  @ApiOperation({ summary: 'Verificar email' })
  @ApiResponse({
    status: 200,
    description: 'Email verificado com sucesso',
    type: String,
  })
  @ApiExtraModels(ErrorDTO)
  @ApiResponse({
    status: 400,
    schema: {
      $ref: getSchemaPath(ErrorDTO),
    },
    description: 'Erro do usuário',
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
  async handle(@Req() req, @Query() query: UserVerifyEmailQueryDTO) {
    const { email, code } = query;

    return await this.handler(
      {
        email,
        code,
      },
      req.path,
      req.method,
    );
  }
}
