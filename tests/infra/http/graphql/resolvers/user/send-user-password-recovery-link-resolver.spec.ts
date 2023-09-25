import { GraphQLError } from 'graphql';
import { SendUserPasswordRecoveryLinkResolver } from '@/infra/http/graphql/resolvers';
import { SendUserPasswordRecoveryLinkStub } from './stubs';

const makeSut = () => {
  const sendUserPasswordRecoveryLinkStub =
    new SendUserPasswordRecoveryLinkStub();
  const sut = new SendUserPasswordRecoveryLinkResolver(
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

describe('Infra (Resolver) - SendUserPasswordRecoveryLinkResolver', () => {
  test('Should not send user password recovery link, because use case returned error', async () => {
    const body = makeBody('email.com');
    const { sut, sendUserPasswordRecoveryLinkStub } = makeSut();
    jest
      .spyOn(sendUserPasswordRecoveryLinkStub, 'execute')
      .mockResolvedValueOnce(Promise.resolve(new Error('error')));

    await sut.handle(body).catch((e) => expect(e).toBeInstanceOf(GraphQLError));
  });

  test('Should send user password recovery link', async () => {
    const body = makeBody('email@test.com');
    const { sut } = makeSut();

    const result = await sut.handle(body);

    expect(result).toEqual(Object(body.email));
  });
});
