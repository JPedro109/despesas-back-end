import { Controller, Get, HttpCode, UseGuards, Req } from '@nestjs/common';
import {
  ApiExtraModels,
  ApiOperation,
  ApiResponse,
  ApiTags,
  getSchemaPath,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { AbstractGetExpensesUseCase } from '@/core/domain/expenses/abstracts';
import { GetExpensesResponseDTO } from '@/core/domain/expenses/dtos';
import { ErrorDTO, InternalServerErrorDTO } from '../../dtos';

@ApiTags('Expenses')
@Controller('api/expenses')
export class GetExpensesController {
  constructor(private readonly _useCase: AbstractGetExpensesUseCase) {}

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
  async handle(@Req() req): Promise<GetExpensesResponseDTO> {
    const userId = req.user;

    const response = await this._useCase.execute({
      userId,
    });

    return response;
  }
}
