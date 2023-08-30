import { GraphQLError } from 'graphql';
import { UpdateUserPasswordResolver } from '@/infra/http/graphql/resolvers';
import { UpdateUserPasswordStub } from './stubs';

const makeSut = () => {
  const updateUserPasswordStub = new UpdateUserPasswordStub();
  const sut = new UpdateUserPasswordResolver(updateUserPasswordStub);

  return {
    sut,
    updateUserPasswordStub,
  };
};

const makeBody = (
  id: string,
  password: string,
  newPassword: string,
  newPasswordConfirm: string,
) => {
  return {
    id,
    password,
    newPassword,
    newPasswordConfirm,
  };
};

describe('Infra (Resolver) - UpdateUserPasswordResolver', () => {
  test('Should not update user password, because use case returned not found error', async () => {
    const body = makeBody('2', 'password', 'passwordone', 'passwordone');
    const { sut, updateUserPasswordStub } = makeSut();
    jest
      .spyOn(updateUserPasswordStub, 'execute')
      .mockReturnValueOnce(Promise.resolve(new Error('error')));

    await sut
      .handle(
        { req: { userId: body.id } },
        {
          password: body.password,
          newPassword: body.newPassword,
          newPasswordConfirm: body.newPasswordConfirm,
        },
      )
      .catch((e) => expect(e).toBeInstanceOf(GraphQLError));
  });

  test('Should update user password', async () => {
    const body = makeBody(
      '1',
      'Password1234',
      'Password12345',
      'Password12345',
    );
    const { sut } = makeSut();

    const result = await sut.handle(
      { req: { user: body.id } },
      {
        password: body.password,
        newPassword: body.newPassword,
        newPasswordConfirm: body.newPasswordConfirm,
      },
    );

    expect(result).toEqual(Object(body.id));
  });
});
