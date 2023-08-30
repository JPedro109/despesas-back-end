import { GraphQLError } from 'graphql';
import { DeleteUserResolver } from '@/infra/http/graphql/resolvers';
import { DeleteUserStub } from './stubs';

const makeSut = () => {
  const deleteUserStub = new DeleteUserStub();
  const sut = new DeleteUserResolver(deleteUserStub);

  return {
    sut,
    deleteUserStub,
  };
};

const makeBody = (id: string, password: string, passwordConfirm: string) => {
  return {
    id,
    password,
    passwordConfirm,
  };
};

describe('Infra (Resolver) - DeleteUserResolver', () => {
  test('Should not delete user, because use case returned error', async () => {
    const body = makeBody('1', 'password', 'password');
    const { sut, deleteUserStub } = makeSut();
    jest
      .spyOn(deleteUserStub, 'execute')
      .mockReturnValueOnce(Promise.resolve(new Error('error')));

    await sut
      .handle({ req: { user: body.id } }, body)
      .catch((e) => expect(e).toBeInstanceOf(GraphQLError));
  });

  test('Should delete user', async () => {
    const body = makeBody('1', 'Password1234', 'Password1234');
    const { sut } = makeSut();

    const result = await sut.handle({ req: { user: body.id } }, body);

    expect(result).toEqual(Object(body.id));
  });
});
