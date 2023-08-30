import { GraphQLError } from 'graphql';
import { DeleteExpenseResolver } from '@/infra/http/graphql/resolvers';
import { testExpenseModel } from './datas';
import { DeleteExpenseStub } from './stubs';

const makeSut = () => {
  const deleteExpensesStub = new DeleteExpenseStub();
  const sut = new DeleteExpenseResolver(deleteExpensesStub);

  return {
    sut,
    deleteExpensesStub,
  };
};

const makeBody = (id: string) => {
  return {
    id,
  };
};

describe('Infra (Resolver) - DeleteExpenseResolver', () => {
  test('Should not delete expense, because use case returned error', async () => {
    const body = makeBody('2');
    const { sut, deleteExpensesStub } = makeSut();
    jest
      .spyOn(deleteExpensesStub, 'execute')
      .mockReturnValueOnce(Promise.resolve(new Error('error')));

    await sut.handle(body).catch((e) => expect(e).toBeInstanceOf(GraphQLError));
  });

  test('Should delete expense', async () => {
    const body = makeBody('1');
    const { sut } = makeSut();

    const result = await sut.handle(body);

    expect(result).toEqual(testExpenseModel);
  });
});
