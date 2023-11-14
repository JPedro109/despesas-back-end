import { Body, Controller, Post, HttpCode, Req } from '@nestjs/common';
import {
  ApiExtraModels,
  ApiOperation,
  ApiResponse,
  ApiTags,
  getSchemaPath,
} from '@nestjs/swagger';
import { AbstractLogService } from '@/core/ports';
import { AbstractUserLoginUseCase } from '@/core/domain/users/abstracts';
import {
  ErrorDTO,
  InternalServerErrorDTO,
  UserLoginBodyDTO,
} from '@/infra/http/rest/dtos';
import { AbstractRest } from '@/infra/http/rest/abstract';

@ApiTags('Users')
@Controller('api/users')
export class UserLoginController extends AbstractRest {
  constructor(
    protected readonly useCase: AbstractUserLoginUseCase,
    protected readonly logService: AbstractLogService,
  ) {
    super(useCase, logService);
  }

  @ApiOperation({ summary: 'Login do usuário' })
  @ApiResponse({
    status: 200,
    description: 'Rota de login do usuário',
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
  async handle(@Req() req, @Body() body: UserLoginBodyDTO) {
    const { email, password } = body;

    return await this.handler(
      {
        email,
        password,
      },
      req.path,
      req.method,
    );
  }
}
