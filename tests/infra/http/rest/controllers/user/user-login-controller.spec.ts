import { BadRequestException } from '@nestjs/common';
import { UserLoginController } from '@/infra/http/rest/controllers';
import { LogStub, UserLoginStub } from './stubs';

const makeSut = () => {
  const userLoginStub = new UserLoginStub();
  const logStub = new LogStub();
  const sut = new UserLoginController(userLoginStub, logStub);

  return {
    sut,
    userLoginStub,
  };
};

const makeBody = (email: string, password: string) => {
  return {
    email,
    password,
  };
};

describe('Infra (Controller) - UserLoginController', () => {
  test('Should not login user, because use case returned error', async () => {
    const body = makeBody('email.com', 'password');
    const { sut, userLoginStub } = makeSut();
    jest
      .spyOn(userLoginStub, 'execute')
      .mockResolvedValueOnce(Promise.resolve(new Error('error')));

    await sut
      .handle({}, body)
      .catch((e) => expect(e).toBeInstanceOf(BadRequestException));
  });

  test('Should login user', async () => {
    const body = makeBody('email@test.com', 'Password1234');
    const { sut } = makeSut();

    const result = await sut.handle({}, body);

    expect(result).toEqual(Object('code'));
  });
});
