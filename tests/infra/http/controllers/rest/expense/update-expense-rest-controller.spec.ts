import { BadRequestException, NotFoundException } from '@nestjs/common';
import { UpdateExpenseRestController } from '@/infra/http/controllers';
import { NotFoundError } from '@/core/errors';
import { testExpenseModel } from './datas';
import { UpdateExpenseStub } from './stubs';

const makeSut = () => {
  const updateExpenseStub = new UpdateExpenseStub();
  const sut = new UpdateExpenseRestController(updateExpenseStub);

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

describe('Infra (RestController) - UpdateExpenseRestController', () => {
  test('Should not update expense, because use case returned not found error', async () => {
    const body = makeBody('2', 'expense', 100, '3000-01-01');
    const { sut, updateExpenseStub } = makeSut();
    jest
      .spyOn(updateExpenseStub, 'execute')
      .mockReturnValueOnce(Promise.resolve(new NotFoundError('error')));

    await sut
      .handle(
        { id: body.id },
        {
          expenseName: body.expenseName,
          expenseValue: body.expenseValue,
          dueDate: new Date(body.dueDate),
        },
      )
      .catch((e) => expect(e).toBeInstanceOf(NotFoundException));
  });

  test('Should not update expense, because use case returned error', async () => {
    const body = makeBody('1', 'expense', -100, '2000-01-01');
    const { sut, updateExpenseStub } = makeSut();
    jest
      .spyOn(updateExpenseStub, 'execute')
      .mockReturnValueOnce(Promise.resolve(new Error('error')));

    await sut
      .handle(
        { id: body.id },
        {
          expenseName: body.expenseName,
          expenseValue: body.expenseValue,
          dueDate: new Date(body.dueDate),
        },
      )
      .catch((e) => expect(e).toBeInstanceOf(BadRequestException));
  });

  test('Should update expense', async () => {
    const body = makeBody('1', 'expense', 100, '3000-01-01');
    const { sut } = makeSut();

    const result = await sut
      .handle(
        { id: body.id },
        {
          expenseName: body.expenseName,
          expenseValue: body.expenseValue,
          dueDate: new Date(body.dueDate),
        },
      )
      .catch((e) => expect(e).toBeInstanceOf(BadRequestException));

    expect(result).toEqual(Object(testExpenseModel));
  });
});
