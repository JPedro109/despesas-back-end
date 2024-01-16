/* eslint-disable @typescript-eslint/no-unused-vars */

import {
  AbstractCreateExpenseUseCase,
  AbstractGetExpensesUseCase,
  AbstractUpdateExpenseUseCase,
  AbstractDeleteExpenseUseCase,
} from '@/core/domain/expenses/abstracts';

import {
  CreateExpenseDTO,
  DeleteExpenseDTO,
  UpdateExpenseDTO,
  GetExpensesDTO,
  CreateExpenseResponseDTO,
  GetExpensesResponseDTO,
  UpdateExpenseResponseDTO,
  DeleteExpenseResponseDTO,
} from '@/core/domain/expenses/dtos';

import { testExpenseModel } from '../datas';
import { AbstractLogService } from '@/core/ports';

export class CreateExpenseStub implements AbstractCreateExpenseUseCase {
  async execute({
    expenseName,
    expenseValue,
    dueDate,
  }: CreateExpenseDTO): Promise<CreateExpenseResponseDTO> {
    return testExpenseModel;
  }
}

export class GetExpensesStub implements AbstractGetExpensesUseCase {
  async execute({ userId }: GetExpensesDTO): Promise<GetExpensesResponseDTO> {
    return [testExpenseModel];
  }
}

export class UpdateExpenseStub implements AbstractUpdateExpenseUseCase {
  async execute({
    id,
    expenseName,
    expenseValue,
    dueDate,
  }: UpdateExpenseDTO): Promise<UpdateExpenseResponseDTO> {
    return testExpenseModel;
  }
}

export class DeleteExpenseStub implements AbstractDeleteExpenseUseCase {
  async execute({ id }: DeleteExpenseDTO): Promise<DeleteExpenseResponseDTO> {
    return testExpenseModel;
  }
}

export class LogStub implements AbstractLogService {
  trace(title: string, message: string, trace: string): boolean {
    return true;
  }
  log(title: string, message: string): boolean {
    return true;
  }
  warn(title: string, message: string): boolean {
    return true;
  }
  error(title: string, message: string): boolean {
    return true;
  }
}
