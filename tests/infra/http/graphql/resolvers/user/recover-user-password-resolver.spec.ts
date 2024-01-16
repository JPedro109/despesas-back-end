import { GraphQLError } from 'graphql';
import { RecoverUserPasswordResolver } from '@/infra/http/graphql/resolvers';
import { LogStub, RecoverUserPasswordStub } from './stubs';

const makeSut = () => {
  const recoverUserPasswordStub = new RecoverUserPasswordStub();
  const logStub = new LogStub();
  const sut = new RecoverUserPasswordResolver(recoverUserPasswordStub, logStub);

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

describe('Infra (Resolver) - RecoverUserPasswordResolver', () => {
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
      .mockResolvedValueOnce(Promise.resolve(new Error('error')));

    await sut
      .handle(
        { req: { path: '/', method: 'method' } },
        {
          email: body.email,
          code: body.code,
          password: body.password,
          passwordConfirm: body.passwordConfirm,
        },
      )
      .catch((e) => expect(e).toBeInstanceOf(GraphQLError));
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
      { req: { path: '/', method: 'method' } },
      {
        email: body.email,
        code: body.code,
        password: body.password,
        passwordConfirm: body.passwordConfirm,
      },
    );

    expect(result).toEqual(Object(body.email));
  });
});
