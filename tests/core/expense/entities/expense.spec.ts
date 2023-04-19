import {
  Expense,
  InvalidExpenseNameError,
  InvalidExpenseValueError,
  InvalidDueDateError,
} from '@/core/domain/expenses/entities';

describe('Entity - Expense', () => {
  test('Should not create Expense, because expense is not valid', () => {
    const invalidExpenseName = '';
    const expenseValue = 100;
    const dueDate = new Date('3000-01-01');

    const sut = Expense.create(invalidExpenseName, expenseValue, dueDate);

    expect(sut).toBeInstanceOf(InvalidExpenseNameError);
  });

  test('Should not create Expense, because expense value is not valid', () => {
    const expenseName = 'expense';
    const invalidExpenseValue = -100;
    const dueDate = new Date('3000-01-01');

    const sut = Expense.create(expenseName, invalidExpenseValue, dueDate);

    expect(sut).toBeInstanceOf(InvalidExpenseValueError);
  });

  test('Should not create Expense, because expense due date is not valid', () => {
    const expenseName = 'expense';
    const expenseValue = 100;
    const invalidDueDate = new Date('2000-01-01');

    const sut = Expense.create(expenseName, expenseValue, invalidDueDate);

    expect(sut).toBeInstanceOf(InvalidDueDateError);
  });

  test('Should create Expense', () => {
    const expenseName = 'expense';
    const expenseValue = 100;
    const dueDate = new Date('3000-01-01');

    const sut = Expense.create(expenseName, expenseValue, dueDate);

    expect(sut).toBeInstanceOf(Expense);
  });
});
