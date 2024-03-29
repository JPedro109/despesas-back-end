import { Body, Controller, HttpCode, Query, Patch, Req } from '@nestjs/common';
import {
  ApiExtraModels,
  ApiOperation,
  ApiResponse,
  ApiTags,
  getSchemaPath,
} from '@nestjs/swagger';
import { AbstractLogService } from '@/core/ports';
import { AbstractRecoverUserPasswordUseCase } from '@/core/domain/users/abstracts';
import {
  RecoverUserPasswordQueryDTO,
  RecoverUserPasswordBodyDTO,
  ErrorDTO,
  InternalServerErrorDTO,
} from '@/infra/http/rest/dtos';
import { AbstractRest } from '@/infra/http/rest/abstract';

@ApiTags('Users')
@Controller('api/users')
export class RecoverUserPasswordController extends AbstractRest {
  constructor(
    protected readonly useCase: AbstractRecoverUserPasswordUseCase,
    protected readonly logService: AbstractLogService,
  ) {
    super(useCase, logService);
  }

  @ApiOperation({ summary: 'Recuperar senha do usuário.' })
  @ApiResponse({
    status: 200,
    description: 'Senha recuperada com sucesso',
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
    @Req() req,
    @Query()
    query: RecoverUserPasswordQueryDTO,
    @Body()
    body: RecoverUserPasswordBodyDTO,
  ) {
    const { password, passwordConfirm } = body;
    const { email, code } = query;

    return await this.handler(
      {
        email,
        code,
        password,
        passwordConfirm,
      },
      req.path,
      req.method,
    );
  }
}
