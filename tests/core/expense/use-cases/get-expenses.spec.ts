import { ExpenseRepositoryStub, testExpenseModel } from '../../__mocks__';

import { GetExpensesUseCase } from '@/core/domain/expenses/use-cases';

const makeSut = () => {
  const expenseRepository = new ExpenseRepositoryStub();
  const sut = new GetExpensesUseCase(expenseRepository);

  return {
    expenseRepository,
    sut,
  };
};

describe('Use case - GetExpenses', () => {
  test('Should get expenses', async () => {
    const userId = '1';
    const { sut } = makeSut();

    const result = await sut.execute({ userId });

    expect(result).toEqual([testExpenseModel]);
  });
});
