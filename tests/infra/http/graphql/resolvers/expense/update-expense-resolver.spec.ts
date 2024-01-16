import { GraphQLError } from 'graphql';
import { UpdateExpenseResolver } from '@/infra/http/graphql/resolvers';
import { testExpenseModel } from './datas';
import { LogStub, UpdateExpenseStub } from './stubs';

const makeSut = () => {
  const updateExpenseStub = new UpdateExpenseStub();
  const logStub = new LogStub();
  const sut = new UpdateExpenseResolver(updateExpenseStub, logStub);

  return {
    sut,
    updateExpenseStub,
  };
};

const makeBody = (
  id: string,
  expenseName: string,
  expenseValue: number,
  dueDate: string,
) => {
  return {
    id,
    expenseName,
    expenseValue,
    dueDate,
  };
};

describe('Infra (Resolver) - UpdateExpenseResolver', () => {
  test('Should not update expense, because use case returned error', async () => {
    const body = makeBody('2', 'expense', 100, '3000-01-01');
    const { sut, updateExpenseStub } = makeSut();
    jest
      .spyOn(updateExpenseStub, 'execute')
      .mockReturnValueOnce(Promise.resolve(new Error('error')));

    await sut
      .handle(
        { req: { path: '/', method: 'method' } },
        {
          id: body.id,
          expenseName: body.expenseName,
          expenseValue: body.expenseValue,
          dueDate: new Date(body.dueDate),
        },
      )
      .catch((e) => expect(e).toBeInstanceOf(GraphQLError));
  });

  test('Should update expense', async () => {
    const body = makeBody('1', 'expense', 100, '3000-01-01');
    const { sut } = makeSut();

    const result = await sut.handle(
      { req: { path: '/', method: 'method' } },
      {
        id: body.id,
        expenseName: body.expenseName,
        expenseValue: body.expenseValue,
        dueDate: new Date(body.dueDate),
      },
    );

    expect(result).toEqual(testExpenseModel);
  });
});
