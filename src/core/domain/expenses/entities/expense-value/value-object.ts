import { InvalidExpenseValueError } from './errors';

export class ExpenseValue {
  private readonly _expenseValue: number;

  private constructor(expenseValue: number) {
    this._expenseValue = expenseValue;
    Object.freeze(this);
  }

  public get value(): number {
    return this._expenseValue;
  }

  static create(expenseValue: number) {
    if (!this.validate(expenseValue)) return new InvalidExpenseValueError();

    return new ExpenseValue(expenseValue);
  }

  private static validate(expenseValue: number): boolean {
    if (expenseValue < 0) return false;

    return true;
  }
}
