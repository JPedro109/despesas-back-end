import { Injectable } from '@nestjs/common';
import { Expense } from '@/core/domain/expenses/entities';
import { NotFoundError } from '@/core/errors';
import { AbstractExpenseRepository } from '../repositories';
import { AbstractUpdateExpenseUseCase } from '../abstracts';
import { UpdateExpenseDTO, UpdateExpenseResponseDTO } from '../dtos';

@Injectable()
export class UpdateExpenseUseCase implements AbstractUpdateExpenseUseCase {
  constructor(private readonly repository: AbstractExpenseRepository) {}

  async execute({
    id,
    expenseName,
    expenseValue,
    dueDate,
  }: UpdateExpenseDTO): Promise<UpdateExpenseResponseDTO> {
    const expense = await this.repository.getExpenseById(id);

    if (!expense) return new NotFoundError('Essa despesa não existe');

    const expenseOrError = Expense.create(expenseName, expenseValue, dueDate);

    if (expenseOrError instanceof Error) return expenseOrError;

    return this.repository.updateExpenseById(id, {
      expenseName: expenseOrError.expenseName.value,
      expenseValue: expenseOrError.expenseValue.value,
      dueDate: expenseOrError.dueDate.value,
    });
  }
}
