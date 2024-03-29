import { BadRequestException } from '@nestjs/common';
import { SendUserEmailUpdateLinkController } from '@/infra/http/rest/controllers';
import { LogStub, SendUserEmailUpdateLinkStub } from './stubs';

const makeSut = () => {
  const sendUserEmailUpdateLinkStub = new SendUserEmailUpdateLinkStub();
  const logStub = new LogStub();
  const sut = new SendUserEmailUpdateLinkController(
    sendUserEmailUpdateLinkStub,
    logStub,
  );

  return {
    sut,
    sendUserEmailUpdateLinkStub,
  };
};

const makeBody = (id: string, email: string) => {
  return {
    id,
    email,
  };
};

describe('Infra (Controller) - SendUserEmailUpdateLinkStub', () => {
  test('Should not send user email update link, because use case returned error', async () => {
    const body = makeBody('1', 'email.com');
    const { sut, sendUserEmailUpdateLinkStub } = makeSut();
    jest
      .spyOn(sendUserEmailUpdateLinkStub, 'execute')
      .mockReturnValueOnce(Promise.resolve(new Error('error')));

    await sut
      .handle({ user: body.id }, { email: body.email })
      .catch((e) => expect(e).toBeInstanceOf(BadRequestException));
  });

  test('Should send user email update link', async () => {
    const body = makeBody('1', 'email@test.com');
    const { sut } = makeSut();

    const result = await sut.handle({ user: body.id }, { email: body.email });

    expect(result).toEqual(Object(body.id));
  });
});
