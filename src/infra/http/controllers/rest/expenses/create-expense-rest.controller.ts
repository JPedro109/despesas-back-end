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
  ApiExtraModels,
  ApiOperation,
  ApiResponse,
  ApiTags,
  getSchemaPath,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { AbstractCreateExpenseUseCase } from '@/core/domain/expenses/abstracts';
import { CreateExpenseResponseDTO } from '@/core/domain/expenses/dtos';
import {
  CreateExpenseUserBodyDTO,
  ErrorDTO,
  InternalServerErrorDTO,
} from '@/infra/http/dtos';

@ApiTags('Expenses')
@Controller('api/expenses')
export class CreateExpenseRestController {
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
  async handle(
    @Req() req,
    @Body() body: CreateExpenseUserBodyDTO,
  ): Promise<CreateExpenseResponseDTO> {
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
