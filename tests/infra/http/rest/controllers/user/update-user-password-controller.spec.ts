import { BadRequestException, NotFoundException } from '@nestjs/common';
import { UpdateUserPasswordController } from '@/infra/http/rest/controllers';
import { NotFoundError } from '@/core/errors';
import { LogStub, UpdateUserPasswordStub } from './stubs';

const makeSut = () => {
  const updateUserPasswordStub = new UpdateUserPasswordStub();
  const logStub = new LogStub();
  const sut = new UpdateUserPasswordController(updateUserPasswordStub, logStub);

  return {
    sut,
    updateUserPasswordStub,
  };
};

const makeBody = (
  id: string,
  password: string,
  newPassword: string,
  newPasswordConfirm: string,
) => {
  return {
    id,
    password,
    newPassword,
    newPasswordConfirm,
  };
};

describe('Infra (Controller) - UpdateUserPasswordController', () => {
  test('Should not update user password, because use case returned not found error', async () => {
    const body = makeBody('2', 'password', 'passwordone', 'passwordone');
    const { sut, updateUserPasswordStub } = makeSut();
    jest
      .spyOn(updateUserPasswordStub, 'execute')
      .mockReturnValueOnce(Promise.resolve(new NotFoundError('error')));

    await sut
      .handle(
        { userId: body.id },
        {
          password: body.password,
          newPassword: body.newPassword,
          newPasswordConfirm: body.newPasswordConfirm,
        },
      )
      .catch((e) => expect(e).toBeInstanceOf(NotFoundException));
  });

  test('Should not update user password, because use case returned error', async () => {
    const body = makeBody('2', 'password', 'passwordone', 'passwordone');
    const { sut, updateUserPasswordStub } = makeSut();
    jest
      .spyOn(updateUserPasswordStub, 'execute')
      .mockReturnValueOnce(Promise.resolve(new Error('error')));

    await sut
      .handle(
        { userId: body.id },
        {
          password: body.password,
          newPassword: body.newPassword,
          newPasswordConfirm: body.newPasswordConfirm,
        },
      )
      .catch((e) => expect(e).toBeInstanceOf(BadRequestException));
  });

  test('Should update user password', async () => {
    const body = makeBody(
      '1',
      'Password1234',
      'Password12345',
      'Password12345',
    );
    const { sut } = makeSut();

    const result = await sut.handle(
      { user: body.id },
      {
        password: body.password,
        newPassword: body.newPassword,
        newPasswordConfirm: body.newPasswordConfirm,
      },
    );

    expect(result).toEqual(Object(body.id));
  });
});
