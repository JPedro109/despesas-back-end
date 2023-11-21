import { Body, Controller, Post, HttpCode, Req } from '@nestjs/common';
import {
  ApiExtraModels,
  ApiOperation,
  ApiResponse,
  ApiTags,
  getSchemaPath,
} from '@nestjs/swagger';
import { AbstractLogService } from '@/core/ports';
import { AbstractCreateUserUseCase } from '@/core/domain/users/abstracts';
import {
  CreateUserBodyDTO,
  ErrorDTO,
  InternalServerErrorDTO,
} from '@/infra/http/rest/dtos';
import { AbstractRest } from '@/infra/http/rest/abstract';

@ApiTags('Users')
@Controller('api/users')
export class CreateUserController extends AbstractRest {
  constructor(
    protected readonly useCase: AbstractCreateUserUseCase,
    protected readonly logService: AbstractLogService,
  ) {
    super(useCase, logService);
  }

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
  async handle(@Req() req, @Body() body: CreateUserBodyDTO) {
    const { email, password, passwordConfirm } = body;

    return await this.handler(
      {
        email,
        password,
        passwordConfirm,
      },
      req.path,
      req.method,
      201,
    );
  }
}
