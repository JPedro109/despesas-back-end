import {
  Param,
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
import { AbstractRest } from '@/infra/http/rest/abstract';
import { AbstractDeleteExpenseUseCase } from '@/core/domain/expenses/abstracts';
import {
  DeleteExpenseParamsDTO,
  ErrorDTO,
  InternalServerErrorDTO,
} from '@/infra/http/rest/dtos';

@ApiTags('Expenses')
@ApiBearerAuth()
@Controller('api/expenses')
export class DeleteExpenseController extends AbstractRest {
  constructor(
    protected readonly useCase: AbstractDeleteExpenseUseCase,
    protected readonly logService: AbstractLogService,
  ) {
    super(useCase, logService);
  }

  @ApiOperation({ summary: 'Deletar despesa' })
  @ApiResponse({
    status: 200,
    description: 'Rota de deleção de despesa',
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
    description: 'Despesa não encontrada',
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
  @Delete(':id')
  async handle(@Req() req, @Param() body: DeleteExpenseParamsDTO) {
    const { id } = body;

    return await this.handler(
      {
        id,
      },
      req.path,
      req.method,
    );
  }
}
