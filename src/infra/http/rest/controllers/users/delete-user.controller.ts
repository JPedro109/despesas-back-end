import {
  Body,
  Controller,
  Delete,
  HttpCode,
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
import { AbstractDeleteUserUseCase } from '@/core/domain/users/abstracts';
import {
  DeleteUserBodyDTO,
  ErrorDTO,
  InternalServerErrorDTO,
} from '@/infra/http/rest/dtos';
import { AbstractRest } from '@/infra/http/rest/abstract';

@ApiTags('Users')
@ApiBearerAuth()
@Controller('api/users')
export class DeleteUserController extends AbstractRest {
  constructor(
    protected readonly useCase: AbstractDeleteUserUseCase,
    protected readonly logService: AbstractLogService,
  ) {
    super(useCase, logService);
  }

  @ApiOperation({ summary: 'Deletar usuário.' })
  @ApiResponse({
    status: 200,
    description: 'Usuário deletado com sucesso',
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
  @Delete()
  async handle(@Req() req, @Body() body: DeleteUserBodyDTO) {
    const { password, passwordConfirm } = body;

    const userId = req.user;

    return await this.handler(
      {
        id: userId,
        password,
        passwordConfirm,
      },
      req.path,
      req.method,
    );
  }
}
