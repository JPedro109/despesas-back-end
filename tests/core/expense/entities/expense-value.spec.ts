import {
  ExpenseValue,
  InvalidExpenseValueError,
} from '@/core/domain/expenses/entities';

describe('Value Object - ExpenseValue', () => {
  test('Should not create ExpenseValue, because value is less than zero', () => {
    const InvalidExpenseValue = -1;

    const sut = ExpenseValue.create(InvalidExpenseValue);

    expect(sut).toBeInstanceOf(InvalidExpenseValueError);
  });

  test('Should create ExpenseValue', () => {
    const expenseValue = 1;

    const sut = ExpenseValue.create(expenseValue);

    if (!(sut instanceof Error)) expect(sut.value).toBe(expenseValue);
    expect(sut).toBeInstanceOf(ExpenseValue);
  });
});
