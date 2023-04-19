import { ExpenseRepositoryStub, testExpenseModel } from '../../__mocks__';

import { DeleteExpenseUseCase } from '@/core/domain/expenses/use-cases';
import { NotFoundError } from '@/core/errors';

const makeSut = () => {
  const expenseRepository = new ExpenseRepositoryStub();
  const sut = new DeleteExpenseUseCase(expenseRepository);

  return {
    expenseRepository,
    sut,
  };
};

describe('Use case - DeleteExpense', () => {
  test('Should not delete expense, because expense is not exists', async () => {
    const id = '2';
    const { sut, expenseRepository } = makeSut();
    jest
      .spyOn(expenseRepository, 'getExpenseById')
      .mockReturnValueOnce(Promise.resolve(null));

    const result = await sut.execute({ id });

    expect(result).toBeInstanceOf(NotFoundError);
  });

  test('Should delete expense', async () => {
    const id = '1';
    const { sut } = makeSut();

    const result = await sut.execute({ id });

    expect(result).toEqual(testExpenseModel);
  });
});
