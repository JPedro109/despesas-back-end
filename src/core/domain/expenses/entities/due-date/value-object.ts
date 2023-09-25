import { InvalidDueDateError } from './error';

export class DueDate {
  private readonly _dueDate: Date;

  private constructor(dueDate: Date) {
    this._dueDate = dueDate;
    Object.freeze(this);
  }

  public get value(): Date {
    return this._dueDate;
  }

  static create(dueDate: Date) {
    if (!this.validate(dueDate)) return new InvalidDueDateError();

    return new DueDate(dueDate);
  }

  private static validate(dueDate: Date): boolean {
    const currentDate = new Date();

    if (Date.parse(currentDate.toString()) > Date.parse(dueDate.toString()))
      return false;

    return true;
  }
}
