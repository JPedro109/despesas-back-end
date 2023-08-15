import { BadRequestException } from '@nestjs/common';
import { DeleteUserRestController } from '@/infra/http/rest/controllers';
import { InvalidParamError, NotFoundError } from '@/core/errors';
import { DeleteUserStub } from './stubs';

const makeSut = () => {
  const deleteUserStub = new DeleteUserStub();
  const sut = new DeleteUserRestController(deleteUserStub);

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

describe('Infra (RestController) - DeleteUserRestController', () => {
  test('Should not delete user, because use case returned invalid param error', async () => {
    const body = makeBody('1', 'password', 'password');
    const { sut, deleteUserStub } = makeSut();
    jest
      .spyOn(deleteUserStub, 'execute')
      .mockReturnValueOnce(Promise.resolve(new InvalidParamError('error')));

    await sut
      .handle({ user: body.id }, body)
      .catch((e) => expect(e).toBeInstanceOf(BadRequestException));
  });

  test('Should not delete user, because use case returned not found error', async () => {
    const body = makeBody('2', 'password', 'password');
    const { sut, deleteUserStub } = makeSut();
    jest
      .spyOn(deleteUserStub, 'execute')
      .mockReturnValueOnce(Promise.resolve(new NotFoundError('error')));

    await sut
      .handle({ user: body.id }, body)
      .catch((e) => expect(e).toBeInstanceOf(BadRequestException));
  });

  test('Should delete user', async () => {
    const body = makeBody('1', 'Password1234', 'Password1234');
    const { sut } = makeSut();

    const result = await sut.handle({ user: body.id }, body);

    expect(result).toEqual(Object(body.id));
  });
});
