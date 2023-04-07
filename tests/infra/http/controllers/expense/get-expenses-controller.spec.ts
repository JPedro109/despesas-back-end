import { GetExpensesController } from '@/infra/http/controllers';
import { testExpenseModel } from './datas';
import { GetExpensesStub } from './stubs';

const makeSut = () => {
  const getExpensesStub = new GetExpensesStub();
  const sut = new GetExpensesController(getExpensesStub);

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

describe('Infra (Controller) - GetExpenseController', () => {
  test('Should get expense', async () => {
    const body = makeBody('1');
    const { sut } = makeSut();

    const result = await sut.handle({
      user: body.userId,
    });

    expect(result).toEqual(Object([testExpenseModel]));
  });
});
