import { BadRequestException } from '@nestjs/common';
import { CreateUserController } from '@/infra/http/rest/controllers';
import { CreateUserStub, LogStub } from './stubs';

const makeSut = () => {
  const createUserStub = new CreateUserStub();
  const logStub = new LogStub();
  const sut = new CreateUserController(createUserStub, logStub);

  return {
    sut,
    createUserStub,
  };
};

const makeBody = (email: string, password: string, passwordConfirm: string) => {
  return {
    email,
    password,
    passwordConfirm,
  };
};

describe('Infra (Controller) - CreateUserController', () => {
  test('Should not create user, because use case returned error', async () => {
    const body = makeBody('email.com', 'password', 'password');
    const { sut, createUserStub } = makeSut();
    jest
      .spyOn(createUserStub, 'execute')
      .mockReturnValueOnce(Promise.resolve(new Error('error')));

    await sut
      .handle({}, body)
      .catch((e) => expect(e).toBeInstanceOf(BadRequestException));
  });

  test('Should create user', async () => {
    const body = makeBody('email@test.com', 'Password1234', 'Password1234');
    const { sut } = makeSut();

    const result = await sut.handle({}, body);

    expect(result).toEqual(Object(body.email));
  });
});
