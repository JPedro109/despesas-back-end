import { InvalidExpenseNameError } from './error';

export class ExpenseName {
  private readonly _expenseName: string;

  private constructor(expenseName: string) {
    this._expenseName = expenseName;
    Object.freeze(this);
  }

  public get value(): string {
    return this._expenseName;
  }

  static create(expenseName: string): ExpenseName | InvalidExpenseNameError {
    if (!this.validate(expenseName))
      return new InvalidExpenseNameError(expenseName);

    return new ExpenseName(expenseName);
  }

  private static validate(expenseName: string): boolean {
    if (!expenseName) return false;

    if (expenseName.length >= 256) return false;

    return true;
  }
}
