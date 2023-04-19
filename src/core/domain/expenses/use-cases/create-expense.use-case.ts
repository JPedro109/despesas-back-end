import { Injectable } from '@nestjs/common';
import { Expense } from '@/core/domain/expenses/entities';
import { AbstractExpenseRepository } from '../repositories';
import { AbstractCreateExpenseUseCase } from '../abstracts';
import { CreateExpenseDTO, CreateExpenseResponseDTO } from '../dtos';

@Injectable()
export class CreateExpenseUseCase implements AbstractCreateExpenseUseCase {
  constructor(private readonly repository: AbstractExpenseRepository) {}

  async execute({
    expenseName,
    expenseValue,
    dueDate,
    userId,
  }: CreateExpenseDTO): Promise<CreateExpenseResponseDTO> {
    const expenseOrError = Expense.create(expenseName, expenseValue, dueDate);

    if (expenseOrError instanceof Error) return expenseOrError;

    return await this.repository.createExpense(
      expenseOrError.expenseName.value,
      expenseOrError.expenseValue.value,
      expenseOrError.dueDate.value,
      userId,
    );
  }
}
