export class ExpenseModel {
  constructor(
    public readonly id: string,
    public readonly expenseName: string,
    public readonly expenseValue: number,
    public readonly dueDate: Date,
    public readonly userId: string,
  ) {}
}
