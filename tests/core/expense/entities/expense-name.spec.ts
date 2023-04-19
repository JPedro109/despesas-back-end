import {
  ExpenseName,
  InvalidExpenseNameError,
} from '@/core/domain/expenses/entities';

describe('Value Object - ExpenseName', () => {
  test('Should not create ExpenseName, because value is null', () => {
    const invalidExpenseName = '';

    const sut = ExpenseName.create(invalidExpenseName);

    expect(sut).toBeInstanceOf(InvalidExpenseNameError);
  });

  test('Should not create ExpenseName, because value has more than 200 characters', () => {
    const invalidExpenseName = 'c'.repeat(300);

    const sut = ExpenseName.create(invalidExpenseName);

    expect(sut).toBeInstanceOf(InvalidExpenseNameError);
  });

  test('Should create ExpenseName', () => {
    const expenseName = 'expense';

    const sut = ExpenseName.create(expenseName);

    if (!(sut instanceof Error)) expect(sut.value).toBe(expenseName);
    expect(sut).toBeInstanceOf(ExpenseName);
  });
});
