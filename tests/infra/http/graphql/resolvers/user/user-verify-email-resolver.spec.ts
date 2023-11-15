import { GraphQLError } from 'graphql';
import { UserVerifyEmailResolver } from '@/infra/http/graphql/resolvers';
import { LogStub, UserVerifyEmailStub } from './stubs';

const makeSut = () => {
  const userVerifyEmailStub = new UserVerifyEmailStub();
  const logStub = new LogStub();
  const sut = new UserVerifyEmailResolver(userVerifyEmailStub, logStub);

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

describe('Infra (Resolver) - UserVerifyEmailResolver', () => {
  test('Should not verify email user, because use case returned error', async () => {
    const body = makeBody('email_invalid@test.com', 'code');
    const { sut, userVerifyEmailStub } = makeSut();
    jest
      .spyOn(userVerifyEmailStub, 'execute')
      .mockResolvedValueOnce(new Error('error'));

    await sut
      .handle({ req: { path: '/', method: 'method' } }, body)
      .catch((e) => expect(e).toBeInstanceOf(GraphQLError));
  });

  test('Should verify email user', async () => {
    const body = makeBody('email@test.com', 'code');
    const { sut } = makeSut();

    const result = await sut.handle(
      { req: { path: '/', method: 'method' } },
      body,
    );

    expect(result).toEqual(Object(body.email));
  });
});
