import { GraphQLError } from 'graphql';
import { CreateExpenseResolver } from '@/infra/http/graphql/resolvers';
import { testExpenseModel } from './datas';
import { CreateExpenseStub, LogStub } from './stubs';

const makeSut = () => {
  const createExpenseStub = new CreateExpenseStub();
  const logStub = new LogStub();
  const sut = new CreateExpenseResolver(createExpenseStub, logStub);

  return {
    sut,
    createExpenseStub,
  };
};

const makeBody = (
  userId: string,
  expenseName: string,
  expenseValue: number,
  dueDate: string,
) => {
  return {
    userId,
    expenseName,
    expenseValue,
    dueDate,
  };
};

describe('Infra (Resolver) - CreateExpenseResolver', () => {
  test('Should not create expense, because use case returned error', async () => {
    const body = makeBody('1', 'expense', -100, '2000-01-01');
    const { sut, createExpenseStub } = makeSut();
    jest
      .spyOn(createExpenseStub, 'execute')
      .mockReturnValueOnce(Promise.resolve(new Error('error')));

    await sut
      .handle(
        { req: { path: '/', method: 'method' } },
        {
          expenseName: body.expenseName,
          expenseValue: body.expenseValue,
          dueDate: new Date(body.dueDate),
        },
      )
      .catch((e) => expect(e).toBeInstanceOf(GraphQLError));
  });

  test('Should create expense', async () => {
    const body = makeBody('1', 'expense', 100, '3000-01-01');
    const { sut } = makeSut();

    const result = await sut.handle(
      { req: { userId: body.userId } },
      {
        expenseName: body.expenseName,
        expenseValue: body.expenseValue,
        dueDate: new Date(body.dueDate),
      },
    );

    expect(result).toEqual(Object(testExpenseModel));
  });
});
