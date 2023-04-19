import { Injectable, Scope } from '@nestjs/common';
import { expense as ExpensePrismaModel } from '@prisma/client';
import { AbstractExpenseRepository } from '@/core/domain/expenses/repositories';
import { ExpenseModel } from '@/core/domain/expenses/models';
import { DatabaseService } from '@/infra/database/prisma';
import { Context } from '../types';
import { camelToSnakeCaseMapper } from '../mappers';

@Injectable({ scope: Scope.TRANSIENT })
export class ExpenseRepository implements AbstractExpenseRepository {
  constructor(private readonly prisma: DatabaseService) {}

  private context: Context = this.prisma;

  private toMapperExpenseModel(expense: ExpensePrismaModel) {
    return new ExpenseModel(
      expense.id,
      expense.expense_name,
      expense.expense_value,
      expense.due_date,
      expense.user_id,
    );
  }

  setContext(context: unknown): void {
    this.context = context as Context;
  }

  async createExpense(
    expenseName: string,
    value: number,
    dueDate: Date,
    userId: string,
  ): Promise<ExpenseModel> {
    const expense = await this.context.expense.create({
      data: {
        expense_name: expenseName,
        expense_value: value,
        due_date: new Date(dueDate),
        user_id: userId,
      },
    });

    return this.toMapperExpenseModel(expense);
  }

  async getExpenseById(id: string): Promise<ExpenseModel | null> {
    const expense = await this.context.expense.findUnique({
      where: {
        id,
      },
    });

    if (!expense) return null;

    return this.toMapperExpenseModel(expense);
  }

  async getExpensesByUserId(userId: string): Promise<ExpenseModel[]> {
    const expenses = await this.context.expense.findMany({
      where: {
        user_id: userId,
      },
    });

    const formatedExpenses = [];

    expenses.forEach((element) =>
      formatedExpenses.push(this.toMapperExpenseModel(element)),
    );

    return formatedExpenses;
  }

  async updateExpenseById(
    id: string,
    data: Partial<ExpenseModel>,
  ): Promise<ExpenseModel> {
    data = !data.dueDate ? data : { ...data, dueDate: new Date(data.dueDate) };

    const expense = await this.context.expense.update({
      where: {
        id,
      },
      data: {
        ...camelToSnakeCaseMapper(data),
        updated_at: new Date(),
      },
    });

    return this.toMapperExpenseModel(expense);
  }

  async deleteExpenseById(id: string): Promise<ExpenseModel> {
    const expense = await this.context.expense.delete({
      where: {
        id,
      },
    });

    return this.toMapperExpenseModel(expense);
  }
}
