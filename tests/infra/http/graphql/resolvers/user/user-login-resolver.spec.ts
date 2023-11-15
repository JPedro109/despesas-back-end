import { GraphQLError } from 'graphql';
import { UserLoginResolver } from '@/infra/http/graphql/resolvers';
import { LogStub, UserLoginStub } from './stubs';

const makeSut = () => {
  const userLoginStub = new UserLoginStub();
  const logStub = new LogStub();
  const sut = new UserLoginResolver(userLoginStub, logStub);

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

describe('Infra (Resolver) - UserLoginResolver', () => {
  test('Should not login user, because use case returned error', async () => {
    const body = makeBody('email.com', 'password');
    const { sut, userLoginStub } = makeSut();
    jest
      .spyOn(userLoginStub, 'execute')
      .mockResolvedValueOnce(Promise.resolve(new Error('error')));

    await sut
      .handle({ req: { path: '/', method: 'method' } }, body)
      .catch((e) => expect(e).toBeInstanceOf(GraphQLError));
  });

  test('Should login user', async () => {
    const body = makeBody('email@test.com', 'Password1234');
    const { sut } = makeSut();

    const result = await sut.handle(
      { req: { path: '/', method: 'method' } },
      body,
    );

    expect(result).toEqual(Object('code'));
  });
});
