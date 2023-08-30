import { GetExpensesResolver } from '@/infra/http/graphql/resolvers';
import { testExpenseModel } from './datas';
import { GetExpensesStub } from './stubs';

const makeSut = () => {
  const getExpensesStub = new GetExpensesStub();
  const sut = new GetExpensesResolver(getExpensesStub);

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

    const result = await sut.handle({ req: { userId: body.userId } });

    expect(result).toEqual([testExpenseModel]);
  });
});
