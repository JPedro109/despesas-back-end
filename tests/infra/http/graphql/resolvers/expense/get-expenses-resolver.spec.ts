import { GetExpensesResolver } from '@/infra/http/graphql/resolvers';
import { testExpenseModel } from './datas';
import { GetExpensesStub, LogStub } from './stubs';

const makeSut = () => {
  const getExpensesStub = new GetExpensesStub();
  const logStub = new LogStub();
  const sut = new GetExpensesResolver(getExpensesStub, logStub);

  return {
    sut,
    getExpensesStub,
  };
};

const makeBody = (userId: string) => {
  return {
    userId,
  };
};

describe('Infra (Resolver) - GetExpenseResolver', () => {
  test('Should get expense', async () => {
    const body = makeBody('1');
    const { sut } = makeSut();

    const result = await sut.handle({
      req: { userId: body.userId, path: '/', method: 'method' },
    });

    expect(result).toEqual([testExpenseModel]);
  });
});
