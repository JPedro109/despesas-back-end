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
import { AuthGuard } from '@nestjs/passport';
import { AbstractUpdateExpenseUseCase } from '@/core/domain/expenses/abstracts';
import { UpdateExpenseResponseDTO } from '@/core/domain/expenses/dtos';
import { NotFoundError } from '@/core/errors';
import {
  UpdateExpenseParamsDTO,
  UpdateExpenseUserBodyDTO,
} from '@/infra/http/dtos';

@Controller('api/expenses')
export class UpdateExpenseController {
  constructor(private readonly _useCase: AbstractUpdateExpenseUseCase) {}

  @UseGuards(AuthGuard('jwt'))
  @HttpCode(200)
  @Put(':id')
  async handle(
    @Param() param: UpdateExpenseParamsDTO,
    @Body() body: UpdateExpenseUserBodyDTO,
  ): Promise<UpdateExpenseResponseDTO> {
    const { id } = param;

    const { expenseName, expenseValue, dueDate } = body;

    const response = await this._useCase.execute({
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
