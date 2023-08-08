import { GetExpensesRestController } from '@/infra/http/controllers';
import { testExpenseModel } from './datas';
import { GetExpensesStub } from './stubs';

const makeSut = () => {
  const getExpensesStub = new GetExpensesStub();
  const sut = new GetExpensesRestController(getExpensesStub);

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

describe('Infra (RestController) - GetExpenseRestController', () => {
  test('Should get expense', async () => {
    const body = makeBody('1');
    const { sut } = makeSut();

    const result = await sut.handle({
      user: body.userId,
    });

    expect(result).toEqual(Object([testExpenseModel]));
  });
});
