import { BadRequestException } from '@nestjs/common';
import { CreateExpenseRestController } from '@/infra/http/controllers';
import { testExpenseModel } from './datas';
import { CreateExpenseStub } from './stubs';

const makeSut = () => {
  const createExpenseStub = new CreateExpenseStub();
  const sut = new CreateExpenseRestController(createExpenseStub);

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

describe('Infra (RestController) - CreateExpenseRestController', () => {
  test('Should not create expense, because use case returned error', async () => {
    const body = makeBody('1', 'expense', -100, '2000-01-01');
    const { sut, createExpenseStub } = makeSut();
    jest
      .spyOn(createExpenseStub, 'execute')
      .mockReturnValueOnce(Promise.resolve(new Error('error')));

    await sut
      .handle(
        { userId: body.userId },
        {
          expenseName: body.expenseName,
          expenseValue: body.expenseValue,
          dueDate: new Date(body.dueDate),
        },
      )
      .catch((e) => expect(e).toBeInstanceOf(BadRequestException));
  });

  test('Should create expense', async () => {
    const body = makeBody('1', 'expense', 100, '3000-01-01');
    const { sut } = makeSut();

    const result = await sut.handle(
      { userId: body.userId },
      {
        expenseName: body.expenseName,
        expenseValue: body.expenseValue,
        dueDate: new Date(body.dueDate),
      },
    );

    expect(result).toEqual(Object(testExpenseModel));
  });
});
