import { ExpenseRepositoryStub, testExpenseModel } from '../../__mocks__';

import { UpdateExpenseUseCase } from '@/core/domain/expenses/use-cases';
import { NotFoundError } from '@/core/errors';

const makeSut = () => {
  const expenseRepository = new ExpenseRepositoryStub();
  const sut = new UpdateExpenseUseCase(expenseRepository);

  return {
    expenseRepository,
    sut,
  };
};

describe('Use case - UpdateExpense', () => {
  test('Should not update expense, because expense is not exists', async () => {
    const id = '2';
    const expenseName = 'expense';
    const expenseValue = 100;
    const dueDate = new Date('3000-01-01');
    const { sut, expenseRepository } = makeSut();
    jest
      .spyOn(expenseRepository, 'getExpenseById')
      .mockReturnValueOnce(Promise.resolve(null));

    const result = await sut.execute({
      id,
      expenseName,
      expenseValue,
      dueDate,
    });

    expect(result).toBeInstanceOf(NotFoundError);
  });

  test('Should not update expense, because expense creation rules is not respect', async () => {
    const id = '1';
    const expenseName = 'expense';
    const expenseValue = -1;
    const dueDate = new Date('2000-01-01');
    const { sut } = makeSut();

    const result = await sut.execute({
      id,
      expenseName,
      expenseValue,
      dueDate,
    });

    expect(result).toBeInstanceOf(Error);
  });

  test('Should update expense', async () => {
    const id = '1';
    const expenseName = 'expense';
    const expenseValue = 100;
    const dueDate = new Date('3000-01-01');
    const { sut } = makeSut();

    const result = await sut.execute({
      id,
      expenseName,
      expenseValue,
      dueDate,
    });

    expect(result).toEqual(testExpenseModel);
  });
});
