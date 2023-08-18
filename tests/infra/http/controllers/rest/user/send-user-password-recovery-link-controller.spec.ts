import { BadRequestException, NotFoundException } from '@nestjs/common';
import { SendUserPasswordRecoveryLinkController } from '@/infra/http/rest/controllers';
import { InvalidParamError, NotFoundError } from '@/core/errors';
import { SendUserPasswordRecoveryLinkStub } from './stubs';

const makeSut = () => {
  const sendUserPasswordRecoveryLinkStub =
    new SendUserPasswordRecoveryLinkStub();
  const sut = new SendUserPasswordRecoveryLinkController(
    sendUserPasswordRecoveryLinkStub,
  );

  return {
    sut,
    sendUserPasswordRecoveryLinkStub,
  };
};

const makeBody = (email: string) => {
  return {
    email,
  };
};

describe('Infra (Controller) - SendUserPasswordRecoveryLinkController', () => {
  test('Should not send user password recovery link, because use case returned invalid param error', async () => {
    const body = makeBody('email.com');
    const { sut, sendUserPasswordRecoveryLinkStub } = makeSut();
    jest
      .spyOn(sendUserPasswordRecoveryLinkStub, 'execute')
      .mockResolvedValueOnce(Promise.resolve(new InvalidParamError('error')));

    await sut
      .handle(body)
      .catch((e) => expect(e).toBeInstanceOf(BadRequestException));
  });

  test('Should not send user password recovery link, because use case returned not found error', async () => {
    const body = makeBody('email.com');
    const { sut, sendUserPasswordRecoveryLinkStub } = makeSut();
    jest
      .spyOn(sendUserPasswordRecoveryLinkStub, 'execute')
      .mockResolvedValueOnce(Promise.resolve(new NotFoundError('error')));

    await sut
      .handle(body)
      .catch((e) => expect(e).toBeInstanceOf(NotFoundException));
  });

  test('Should send user password recovery link', async () => {
    const body = makeBody('email@test.com');
    const { sut } = makeSut();

    const result = await sut.handle(body);

    expect(result).toEqual(Object(body.email));
  });
});
