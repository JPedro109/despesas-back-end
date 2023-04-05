import {
  Body,
  Controller,
  Post,
  BadRequestException,
  HttpCode,
  UseGuards,
  Req,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AbstractCreateExpenseUseCase } from '@/core/domain/expenses/abstracts';
import { CreateExpenseResponseDTO } from '@/core/domain/expenses/dtos';
import { CreateExpenseUserBodyDTO } from '@/infra/http/dtos';

@Controller('api/expenses')
export class CreateExpenseController {
  constructor(private readonly _useCase: AbstractCreateExpenseUseCase) {}

  @UseGuards(AuthGuard('jwt'))
  @HttpCode(201)
  @Post()
  async handle(
    @Req() req,
    @Body() body: CreateExpenseUserBodyDTO,
  ): Promise<CreateExpenseResponseDTO> {
    const { expenseName, expenseValue, dueDate } = body;

    const userId = req.user;

    const response = await this._useCase.execute({
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
