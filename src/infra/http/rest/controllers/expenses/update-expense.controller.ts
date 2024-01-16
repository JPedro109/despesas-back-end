import {
  Param,
  Body,
  Controller,
  Put,
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
import { AbstractUpdateExpenseUseCase } from '@/core/domain/expenses/abstracts';
import {
  ErrorDTO,
  InternalServerErrorDTO,
  UpdateExpenseParamsDTO,
  UpdateExpenseUserBodyDTO,
} from '@/infra/http/rest/dtos';

@ApiTags('Expenses')
@ApiBearerAuth()
@Controller('api/expenses')
export class UpdateExpenseController extends AbstractRest {
  constructor(
    protected readonly useCase: AbstractUpdateExpenseUseCase,
    protected readonly logService: AbstractLogService,
  ) {
    super(useCase, logService);
  }

  @ApiOperation({ summary: 'Atualizar despesa' })
  @ApiResponse({
    status: 200,
    description: 'Rota de atualização de despesa',
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
  @Put(':id')
  async handle(
    @Req() req,
    @Param() param: UpdateExpenseParamsDTO,
    @Body() body: UpdateExpenseUserBodyDTO,
  ) {
    const { id } = param;

    const { expenseName, expenseValue, dueDate } = body;

    return await this.handler(
      {
        id,
        expenseName,
        expenseValue,
        dueDate,
      },
      req.path,
      req.method,
    );
  }
}
