import { Injectable } from '@nestjs/common';
import { AbstractExpenseRepository } from '../repositories';
import { AbstractGetExpensesUseCase } from '../abstracts';
import { GetExpensesDTO, GetExpensesResponseDTO } from '../dtos';

@Injectable()
export class GetExpensesUseCase implements AbstractGetExpensesUseCase {
  constructor(private readonly repository: AbstractExpenseRepository) {}

  async execute({ userId }: GetExpensesDTO): Promise<GetExpensesResponseDTO> {
    return await this.repository.getExpensesByUserId(userId);
  }
}
