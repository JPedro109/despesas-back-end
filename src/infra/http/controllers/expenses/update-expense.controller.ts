import {
  Param,
  Body,
  Controller,
  Put,
  BadRequestException,
  NotFoundException,
  HttpCode,
  UseGuards,
} from '@nestjs/common';
import {
  ApiExtraModels,
  ApiOperation,
  ApiResponse,
  ApiTags,
  getSchemaPath,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { AbstractUpdateExpenseUseCase } from '@/core/domain/expenses/abstracts';
import { UpdateExpenseResponseDTO } from '@/core/domain/expenses/dtos';
import { NotFoundError } from '@/core/errors';
import {
  ErrorDTO,
  InternalServerErrorDTO,
  UpdateExpenseParamsDTO,
  UpdateExpenseUserBodyDTO,
} from '@/infra/http/dtos';

@ApiTags('Expenses')
@Controller('api/expenses')
export class UpdateExpenseController {
  constructor(private readonly useCase: AbstractUpdateExpenseUseCase) {}

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
  @Put(':id')
  async handle(
    @Param() param: UpdateExpenseParamsDTO,
    @Body() body: UpdateExpenseUserBodyDTO,
  ): Promise<UpdateExpenseResponseDTO> {
    const { id } = param;

    const { expenseName, expenseValue, dueDate } = body;

    const response = await this.useCase.execute({
      id,
      expenseName,
      expenseValue,
      dueDate,
    });

    if (response instanceof NotFoundError)
      throw new NotFoundException(response.message, {
        cause: response,
        description: response.name,
      });

    if (response instanceof Error)
      throw new BadRequestException(response.message, {
        cause: response,
        description: response.name,
      });

    return response;
  }
}
