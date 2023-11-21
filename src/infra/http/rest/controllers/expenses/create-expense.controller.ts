import {
  Body,
  Controller,
  Post,
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
import { AbstractCreateExpenseUseCase } from '@/core/domain/expenses/abstracts';
import {
  CreateExpenseUserBodyDTO,
  ErrorDTO,
  InternalServerErrorDTO,
} from '@/infra/http/rest/dtos';

@ApiTags('Expenses')
@ApiBearerAuth()
@Controller('api/expenses')
export class CreateExpenseController extends AbstractRest {
  constructor(
    protected readonly useCase: AbstractCreateExpenseUseCase,
    protected readonly logService: AbstractLogService,
  ) {
    super(useCase, logService);
  }

  @ApiOperation({ summary: 'Criar despesa' })
  @ApiResponse({
    status: 201,
    description: 'Rota de criação de despesa',
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
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(201)
  @Post()
  async handle(@Req() req, @Body() body: CreateExpenseUserBodyDTO) {
    const { expenseName, expenseValue, dueDate } = body;

    const userId = req.user;

    return await this.handler(
      {
        expenseName,
        expenseValue,
        dueDate,
        userId,
      },
      req.path,
      req.method,
      201,
    );
  }
}
