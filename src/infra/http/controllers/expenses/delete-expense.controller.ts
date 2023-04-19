import {
  Param,
  Controller,
  Delete,
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
import { AbstractDeleteExpenseUseCase } from '@/core/domain/expenses/abstracts';
import { DeleteExpenseResponseDTO } from '@/core/domain/expenses/dtos';
import { NotFoundError } from '@/core/errors';
import {
  DeleteExpenseParamsDTO,
  ErrorDTO,
  InternalServerErrorDTO,
} from '@/infra/http/dtos';

@ApiTags('Expenses')
@Controller('api/expenses')
export class DeleteExpenseController {
  constructor(private readonly _useCase: AbstractDeleteExpenseUseCase) {}

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
  @Delete(':id')
  async handle(
    @Param() body: DeleteExpenseParamsDTO,
  ): Promise<DeleteExpenseResponseDTO> {
    const { id } = body;

    const response = await this._useCase.execute({
      id,
    });

    if (response instanceof NotFoundError)
      throw new NotFoundException(response.message, {
        cause: response,
        description: response.name,
      });

    return response;
  }
}
