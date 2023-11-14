import { Controller, Get, HttpCode, UseGuards, Req } from '@nestjs/common';
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
import { AbstractGetExpensesUseCase } from '@/core/domain/expenses/abstracts';
import { ErrorDTO, InternalServerErrorDTO } from '@/infra/http/rest/dtos';

@ApiTags('Expenses')
@ApiBearerAuth()
@Controller('api/expenses')
export class GetExpensesController extends AbstractRest {
  constructor(
    protected readonly useCase: AbstractGetExpensesUseCase,
    protected readonly logService: AbstractLogService,
  ) {
    super(useCase, logService);
  }

  @ApiOperation({ summary: 'Retornar despesas' })
  @ApiResponse({
    status: 200,
    description: 'Rota de retorno de despesas',
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
  @Get()
  async handle(@Req() req) {
    const userId = req.user;

    return await this.handler(
      {
        userId,
      },
      req.path,
      req.method,
    );
  }
}
