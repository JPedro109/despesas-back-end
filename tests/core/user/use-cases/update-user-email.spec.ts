import {
  ExpenseRepositoryStub,
  UnitOfWorkStub,
  UserRepositoryStub,
  UserVerificationCodeRepositoryStub,
  testUserModel,
} from '../../__mocks__';

import { InvalidParamError, NotFoundError } from '@/core/errors';
import { UpdateUserEmailUseCase } from '@/core/domain/users/use-cases';
import { InvalidEmailError } from '@/core/domain/users/entities';

const makeSut = () => {
  const userRepositoryStub = new UserRepositoryStub();
  const userVerificationCodeRepositoryStub =
    new UserVerificationCodeRepositoryStub();
  const expenseRepository = new ExpenseRepositoryStub();
  const unitOfWorkStub = new UnitOfWorkStub(
    userRepositoryStub,
    userVerificationCodeRepositoryStub,
    expenseRepository,
  );
  const sut = new UpdateUserEmailUseCase(unitOfWorkStub);

  return {
    sut,
    userRepositoryStub,
  };
};

describe('Use case - UpdateUserEmailUseCase', () => {
  test('Should not update user email, because email is invalid', async () => {
    const id = '2';
    const email = 'invalid_email';
    const code = 'code';
    const { sut } = makeSut();

    const result = await sut.execute({ id, email, code });

    expect(result).toBeInstanceOf(InvalidEmailError);
  });

  test('Should not update user email, because user is not exists', async () => {
    const id = '2';
    const email = 'email@test2.com';
    const code = 'code';
    const { sut, userRepositoryStub } = makeSut();
    jest
      .spyOn(userRepositoryStub, 'getUserByIdWithVerificationCode')
      .mockReturnValueOnce(null);

    const result = await sut.execute({ id, email, code });

    expect(result).toBeInstanceOf(NotFoundError);
  });

  test('Should not update user email, because code is invalid', async () => {
    const id = '1';
    const email = 'email@test2.com';
    const invalidCode = 'invalid_code';
    const { sut, userRepositoryStub } = makeSut();
    jest
      .spyOn(userRepositoryStub, 'getUserByIdWithVerificationCode')
      .mockReturnValueOnce(
        Promise.resolve({ ...testUserModel, userVerificationCode: null }),
      );

    const result = await sut.execute({ id, email, code: invalidCode });

    expect(result).toBeInstanceOf(InvalidParamError);
  });

  test('Should not update user email, because code expiried', async () => {
    const id = '1';
    const email = 'email@test2.com';
    const code = 'code';
    const { sut, userRepositoryStub } = makeSut();
    jest
      .spyOn(userRepositoryStub, 'getUserByIdWithVerificationCode')
      .mockReturnValueOnce(
        Promise.resolve({
          ...testUserModel,
          userVerificationCode: {
            ...testUserModel.userVerificationCode,
            verificationCodeExpiryDate: 0,
          },
        }),
      );

    const result = await sut.execute({ id, email, code });

    expect(result).toBeInstanceOf(InvalidParamError);
  });

  test('Should update user email', async () => {
    const id = '1';
    const email = 'email@test2.com';
    const code = 'code';
    const { sut } = makeSut();

    const result = await sut.execute({ id, email, code });

    expect(result).toBe(id);
  });
});
