import {
  Body,
  Controller,
  Post,
  BadRequestException,
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
import { AbstractCreateExpenseUseCase } from '@/core/domain/expenses/abstracts';
import {
  CreateExpenseUserBodyDTO,
  ErrorDTO,
  InternalServerErrorDTO,
} from '@/infra/http/rest/dtos';

@ApiTags('Expenses')
@ApiBearerAuth()
@Controller('api/expenses')
export class CreateExpenseController {
  constructor(private readonly useCase: AbstractCreateExpenseUseCase) {}

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

    const response = await this.useCase.execute({
      expenseName,
      expenseValue,
      dueDate,
      userId,
    });

    if (response instanceof Error)
      throw new BadRequestException(response.message, {
        cause: response,
        description: response.name,
      });

    return response;
  }
}
