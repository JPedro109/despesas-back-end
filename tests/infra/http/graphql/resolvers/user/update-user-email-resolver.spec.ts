import { GraphQLError } from 'graphql';
import { UpdateUserEmailResolver } from '@/infra/http/graphql/resolvers';
import { LogStub, UpdateUserEmailStub } from './stubs';

const makeSut = () => {
  const updateUserEmailStub = new UpdateUserEmailStub();
  const logStub = new LogStub();
  const sut = new UpdateUserEmailResolver(updateUserEmailStub, logStub);

  return {
    sut,
    updateUserEmailStub,
  };
};

const makeBody = (id: string, email: string, code: string) => {
  return {
    id,
    email,
    code,
  };
};

describe('Infra (Resolver) - UpdateUserEmailResolver', () => {
  test('Should not update user email, because use returned error', async () => {
    const body = makeBody('2', 'email.com', 'code_invalid');
    const { sut, updateUserEmailStub } = makeSut();
    jest
      .spyOn(updateUserEmailStub, 'execute')
      .mockReturnValueOnce(Promise.resolve(new Error('error')));

    await sut
      .handle(
        { req: { user: body.id, path: '/', method: 'method' } },
        {
          email: body.email,
          code: body.code,
        },
      )
      .catch((e) => expect(e).toBeInstanceOf(GraphQLError));
  });

  test('Should update user email', async () => {
    const body = makeBody('1', 'email@test.com', 'code');
    const { sut } = makeSut();

    const result = await sut.handle(
      { req: { user: body.id, path: '/', method: 'method' } },
      {
        email: body.email,
        code: body.code,
      },
    );

    expect(result).toEqual(Object(body.id));
  });
});
