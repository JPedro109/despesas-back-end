import { ExpenseModel } from '../models';

export abstract class AbstractExpenseRepository {
  abstract setContext(context: unknown): void;
  abstract createExpense(
    expenseName: string,
    value: number,
    dueDate: Date,
    userId: string,
  ): Promise<ExpenseModel>;
  abstract getExpenseById(id: string): Promise<ExpenseModel | null>;
  abstract getExpensesByUserId(userId: string): Promise<ExpenseModel[]>;
  abstract updateExpenseById(
    id: string,
    data: Partial<ExpenseModel>,
  ): Promise<ExpenseModel>;
  abstract deleteExpenseById(id: string): Promise<ExpenseModel>;
}
