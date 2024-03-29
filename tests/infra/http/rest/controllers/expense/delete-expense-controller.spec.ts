import { BadRequestException, NotFoundException } from '@nestjs/common';
import { DeleteExpenseController } from '@/infra/http/rest/controllers';
import { NotFoundError } from '@/core/errors';
import { testExpenseModel } from './datas';
import { DeleteExpenseStub, LogStub } from './stubs';

const makeSut = () => {
  const deleteExpensesStub = new DeleteExpenseStub();
  const logStub = new LogStub();
  const sut = new DeleteExpenseController(deleteExpensesStub, logStub);

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

describe('Infra (Controller) - DeleteExpenseController', () => {
  test('Should not delete expense, because use case returned not found error', async () => {
    const body = makeBody('2');
    const { sut, deleteExpensesStub } = makeSut();
    jest
      .spyOn(deleteExpensesStub, 'execute')
      .mockReturnValueOnce(Promise.resolve(new NotFoundError('error')));

    await sut
      .handle({}, body)
      .catch((e) => expect(e).toBeInstanceOf(NotFoundException));
  });

  test('Should not delete expense, because use case returned error', async () => {
    const body = makeBody('2');
    const { sut, deleteExpensesStub } = makeSut();
    jest
      .spyOn(deleteExpensesStub, 'execute')
      .mockReturnValueOnce(Promise.resolve(new Error('error')));

    await sut
      .handle({}, body)
      .catch((e) => expect(e).toBeInstanceOf(BadRequestException));
  });

  test('Should delete expense', async () => {
    const body = makeBody('1');
    const { sut } = makeSut();

    const result = await sut.handle({}, body);

    expect(result).toEqual(Object(testExpenseModel));
  });
});
