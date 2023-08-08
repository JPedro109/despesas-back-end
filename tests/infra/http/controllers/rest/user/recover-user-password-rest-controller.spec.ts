import { BadRequestException, NotFoundException } from '@nestjs/common';
import { RecoverUserPasswordRestController } from '@/infra/http/controllers';
import { InvalidParamError, NotFoundError } from '@/core/errors';
import { RecoverUserPasswordStub } from './stubs';

const makeSut = () => {
  const recoverUserPasswordStub = new RecoverUserPasswordStub();
  const sut = new RecoverUserPasswordRestController(recoverUserPasswordStub);

  return {
    sut,
    recoverUserPasswordStub,
  };
};

const makeBody = (
  email: string,
  code: string,
  password: string,
  passwordConfirm: string,
) => {
  return {
    email,
    code,
    password,
    passwordConfirm,
  };
};

describe('Infra (RestController) - RecoverUserPasswordRestController', () => {
  test('Should not recover user password, because use case returned invalid param error', async () => {
    const body = makeBody(
      'email@test.com',
      'code_invalid',
      'password',
      'password',
    );
    const { sut, recoverUserPasswordStub } = makeSut();
    jest
      .spyOn(recoverUserPasswordStub, 'execute')
      .mockResolvedValueOnce(Promise.resolve(new InvalidParamError('error')));

    await sut
      .handle(
        { email: body.email, code: body.code },
        { password: body.password, passwordConfirm: body.passwordConfirm },
      )
      .catch((e) => expect(e).toBeInstanceOf(BadRequestException));
  });

  test('Should not recover user password, because use case returned not found error', async () => {
    const body = makeBody('email.com', 'code_invalid', 'password', 'password');
    const { sut, recoverUserPasswordStub } = makeSut();
    jest
      .spyOn(recoverUserPasswordStub, 'execute')
      .mockResolvedValueOnce(Promise.resolve(new NotFoundError('error')));

    await sut
      .handle(
        { email: body.email, code: body.code },
        { password: body.password, passwordConfirm: body.passwordConfirm },
      )
      .catch((e) => expect(e).toBeInstanceOf(NotFoundException));
  });

  test('Should recover user password', async () => {
    const body = makeBody(
      'email@test.com',
      'code',
      'Password1234',
      'Password1234',
    );
    const { sut } = makeSut();

    const result = await sut.handle(
      { email: body.email, code: body.code },
      { password: body.password, passwordConfirm: body.passwordConfirm },
    );

    expect(result).toEqual(Object(body.email));
  });
});
