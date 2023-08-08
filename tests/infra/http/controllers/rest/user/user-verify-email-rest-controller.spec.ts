import {
  BadRequestException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UserVerifyEmailRestController } from '@/infra/http/controllers';
import { UserVerifyEmailStub } from './stubs';
import {
  InvalidParamError,
  NotFoundError,
  UnauthorizedError,
} from '@/core/errors';

const makeSut = () => {
  const userVerifyEmailStub = new UserVerifyEmailStub();
  const sut = new UserVerifyEmailRestController(userVerifyEmailStub);

  return {
    sut,
    userVerifyEmailStub,
  };
};

const makeBody = (email: string, code: string) => {
  return {
    email,
    code,
  };
};

describe('Infra (RestController) - UserVerifyEmailRestController', () => {
  test('Should not verify email user, because use case returned not found error', async () => {
    const body = makeBody('email_invalid@test.com', 'code');
    const { sut, userVerifyEmailStub } = makeSut();
    jest
      .spyOn(userVerifyEmailStub, 'execute')
      .mockResolvedValueOnce(new NotFoundError('error'));

    await sut
      .handle(body)
      .catch((e) => expect(e).toBeInstanceOf(NotFoundException));
  });

  test('Should not verify email user, because use case returned unauthorized error', async () => {
    const body = makeBody('email_verified@test.com', 'code');
    const { sut, userVerifyEmailStub } = makeSut();
    jest
      .spyOn(userVerifyEmailStub, 'execute')
      .mockResolvedValueOnce(new UnauthorizedError('error'));

    await sut
      .handle(body)
      .catch((e) => expect(e).toBeInstanceOf(UnauthorizedException));
  });

  test('Should not verify email user, because use case returned invalid param error', async () => {
    const body = makeBody('email@test.com', 'code_invalid');
    const { sut, userVerifyEmailStub } = makeSut();
    jest
      .spyOn(userVerifyEmailStub, 'execute')
      .mockResolvedValueOnce(new InvalidParamError('error'));

    await sut
      .handle(body)
      .catch((e) => expect(e).toBeInstanceOf(BadRequestException));
  });

  test('Should verify email user', async () => {
    const body = makeBody('email@test.com', 'code');
    const { sut } = makeSut();

    const result = await sut.handle(body);

    expect(result).toEqual(Object(body.email));
  });
});
