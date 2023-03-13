import {
  ExpenseName,
  ExpenseValue,
  DueDate,
  InvalidExpenseNameError,
  InvalidExpenseValueError,
  InvalidDueDateError,
} from '@/core/domain/expenses/entities';

export class Expense {
  private constructor(
    public readonly expenseName: ExpenseName,
    public readonly expenseValue: ExpenseValue,
    public readonly dueDate: DueDate,
  ) {
    this.expenseName = expenseName;
    this.expenseValue = expenseValue;
    this.dueDate = dueDate;
    Object.freeze(this);
  }

  static create(
    expenseName: string,
    expenseValue: number,
    dueDate: Date,
  ):
    | Expense
    | InvalidExpenseNameError
    | InvalidExpenseValueError
    | InvalidDueDateError {
    const expenseNameOrError = ExpenseName.create(expenseName);

    if (expenseNameOrError instanceof Error) return expenseNameOrError;

    const expenseValueOrError = ExpenseValue.create(expenseValue);

    if (expenseValueOrError instanceof Error) return expenseValueOrError;

    const dueDateOrError = DueDate.create(dueDate);

    if (dueDateOrError instanceof Error) return dueDateOrError;

    return new Expense(expenseNameOrError, expenseValueOrError, dueDateOrError);
  }
}
