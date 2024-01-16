import {
  Query,
  Controller,
  HttpCode,
  Patch,
  UseGuards,
  Req,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiExtraModels,
  ApiOperation,
  ApiResponse,
  ApiTags,
  getSchemaPath,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { AbstractLogService } from '@/core/ports';
import { AbstractUpdateUserEmailUseCase } from '@/core/domain/users/abstracts';
import {
  ErrorDTO,
  InternalServerErrorDTO,
  UpdateUserEmailBodyDTO,
} from '@/infra/http/rest/dtos';
import { AbstractRest } from '@/infra/http/rest/abstract';

@ApiTags('Users')
@ApiBearerAuth()
@Controller('api/users')
export class UpdateUserEmailController extends AbstractRest {
  constructor(
    protected readonly useCase: AbstractUpdateUserEmailUseCase,
    protected readonly logService: AbstractLogService,
  ) {
    super(useCase, logService);
  }

  @ApiOperation({ summary: 'Atualizar email' })
  @ApiResponse({
    status: 200,
    description: 'Email atualizado com sucesso',
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
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(200)
  @Patch('email')
  async handle(
    @Req() req,
    @Query()
    body: UpdateUserEmailBodyDTO,
  ) {
    const { email, code } = body;

    const userId = req.user;

    return await this.handler(
      {
        id: userId,
        email,
        code,
      },
      req.path,
      req.method,
    );
  }
}
