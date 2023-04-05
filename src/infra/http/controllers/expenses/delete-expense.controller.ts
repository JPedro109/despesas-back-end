import {
  Param,
  Controller,
  Delete,
  NotFoundException,
  HttpCode,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AbstractDeleteExpenseUseCase } from '@/core/domain/expenses/abstracts';
import { DeleteExpenseResponseDTO } from '@/core/domain/expenses/dtos';
import { NotFoundError } from '@/core/errors';
import { DeleteExpenseParamsDTO } from '@/infra/http/dtos';

@Controller('api/expenses')
export class DeleteExpenseController {
  constructor(private readonly _useCase: AbstractDeleteExpenseUseCase) {}

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
