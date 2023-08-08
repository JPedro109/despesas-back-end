import { BadRequestException, NotFoundException } from '@nestjs/common';
import { UpdateUserEmailRestController } from '@/infra/http/controllers';
import { NotFoundError } from '@/core/errors';
import { UpdateUserEmailStub } from './stubs';

const makeSut = () => {
  const updateUserEmailStub = new UpdateUserEmailStub();
  const sut = new UpdateUserEmailRestController(updateUserEmailStub);

  return {
    sut,
    updateUserEmailStub,
  };
};

const makeBody = (id: string, email: string, code: string) => {
  return {
    id,
    email,
    code,
  };
};

describe('Infra (RestController) - UpdateUserEmailRestController', () => {
  test('Should not update user email, because use returned not found error', async () => {
    const body = makeBody('2', 'email.com', 'code_invalid');
    const { sut, updateUserEmailStub } = makeSut();
    jest
      .spyOn(updateUserEmailStub, 'execute')
      .mockReturnValueOnce(Promise.resolve(new NotFoundError('error')));

    await sut
      .handle(
        { user: body.id },
        {
          email: body.email,
          code: body.code,
        },
      )
      .catch((e) => expect(e).toBeInstanceOf(NotFoundException));
  });

  test('Should not update user email, because use returned error', async () => {
    const body = makeBody('2', 'email.com', 'code_invalid');
    const { sut, updateUserEmailStub } = makeSut();
    jest
      .spyOn(updateUserEmailStub, 'execute')
      .mockReturnValueOnce(Promise.resolve(new Error('error')));

    await sut
      .handle(
        { user: body.id },
        {
          email: body.email,
          code: body.code,
        },
      )
      .catch((e) => expect(e).toBeInstanceOf(BadRequestException));
  });

  test('Should update user email', async () => {
    const body = makeBody('1', 'email@test.com', 'code');
    const { sut } = makeSut();

    const result = await sut.handle(
      { user: body.id },
      {
        email: body.email,
        code: body.code,
      },
    );

    expect(result).toEqual(Object(body.id));
  });
});
