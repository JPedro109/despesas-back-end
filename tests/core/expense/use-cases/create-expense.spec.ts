import { ExpenseRepositoryStub, testExpenseModel } from '../../__mocks__';

import { CreateExpenseUseCase } from '@/core/domain/expenses/use-cases';

const makeSut = () => {
  const expenseRepository = new ExpenseRepositoryStub();
  const sut = new CreateExpenseUseCase(expenseRepository);

  return {
    expenseRepository,
    sut,
  };
};

describe('Use case - CreateExpense', () => {
  test('Should not create expense, because expense creation rules is not respect', async () => {
    const expenseName = '';
    const expenseValue = -1;
    const dueDate = new Date('2000-01-01');
    const userId = '1';
    const { sut } = makeSut();

    const result = await sut.execute({
      expenseName,
      expenseValue,
      dueDate,
      userId,
    });

    expect(result).toBeInstanceOf(Error);
  });

  test('Should create expense', async () => {
    const expenseName = 'expense';
    const expenseValue = 100;
    const dueDate = new Date('3000-01-01');
    const userId = '1';
    const { sut } = makeSut();

    const result = await sut.execute({
      expenseName,
      expenseValue,
      dueDate,
      userId,
    });

    expect(result).toEqual(testExpenseModel);
  });
});
