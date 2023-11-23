import {
  Controller,
  HttpCode,
  Patch,
  UseGuards,
  Req,
  Body,
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
import { AbstractUpdateUserPasswordUseCase } from '@/core/domain/users/abstracts';
import {
  ErrorDTO,
  InternalServerErrorDTO,
  UpdateUserPasswordBodyDTO,
} from '@/infra/http/rest/dtos';
import { AbstractRest } from '@/infra/http/rest/abstract';

@ApiTags('Users')
@ApiBearerAuth()
@Controller('api/users')
export class UpdateUserPasswordController extends AbstractRest {
  constructor(
    protected readonly useCase: AbstractUpdateUserPasswordUseCase,
    protected readonly logService: AbstractLogService,
  ) {
    super(useCase, logService);
  }

  @ApiOperation({ summary: 'Atualizar senha' })
  @ApiResponse({
    status: 200,
    description: 'Senha atualizada com sucesso',
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
  @Patch('password')
  async handle(
    @Req() req,
    @Body()
    body: UpdateUserPasswordBodyDTO,
  ) {
    const { password, newPassword, newPasswordConfirm } = body;

    const userId = req.user;

    return await this.handler(
      {
        id: userId,
        password,
        newPassword,
        newPasswordConfirm,
      },
      req.path,
      req.method,
    );
  }
}
