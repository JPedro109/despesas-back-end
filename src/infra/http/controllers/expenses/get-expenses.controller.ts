import { Controller, Get, HttpCode, UseGuards, Req } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AbstractGetExpensesUseCase } from '@/core/domain/expenses/abstracts';
import { GetExpensesResponseDTO } from '@/core/domain/expenses/dtos';

@Controller('api/expenses')
export class GetExpensesController {
  constructor(private readonly _useCase: AbstractGetExpensesUseCase) {}

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
