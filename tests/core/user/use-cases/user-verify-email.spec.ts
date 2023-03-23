import { UserRepositoryStub, testUserModel } from '../../__mocks__';

import {
  InvalidParamError,
  NotFoundError,
  UnauthorizedError,
} from '@/core/errors';
import { UserVerifyEmailUseCase } from '@/core/domain/users/use-cases';

const makeSut = () => {
  const userRepositoryStub = new UserRepositoryStub();
  const sut = new UserVerifyEmailUseCase(userRepositoryStub);

  return {
    sut,
    userRepositoryStub,
  };
};

describe('Use case - UserVerifyEmailUseCase', () => {
  test('Shoud not verify email, because email is not register', async () => {
    const email = 'email_invalid@test.com';
    const code = 'code';
    const { sut } = makeSut();

    const result = await sut.execute({ email, code });

    expect(result).toBeInstanceOf(NotFoundError);
  });

  test('Shoud not verify email, because code is invalid', async () => {
    const email = 'email@test.com';
    const invalidCode = 'invalid_code';
    const { sut, userRepositoryStub } = makeSut();
    jest
      .spyOn(userRepositoryStub, 'getUserByEmailWithVerificationCode')
      .mockResolvedValueOnce(
        Promise.resolve({
          ...testUserModel,
          verifiedEmail: false,
          userVerificationCode: null,
        }),
      );

    const result = await sut.execute({ email, code: invalidCode });

    expect(result).toBeInstanceOf(InvalidParamError);
  });

  test('Shoud not verify email, because email already is verified', async () => {
    const email = 'email@test.com';
    const code = 'code';
    const { sut, userRepositoryStub } = makeSut();
    jest
      .spyOn(userRepositoryStub, 'getUserByEmailWithVerificationCode')
      .mockResolvedValueOnce(Promise.resolve(testUserModel));

    const result = await sut.execute({ email, code });

    expect(result).toBeInstanceOf(UnauthorizedError);
  });

  test('Shoud verify the email', async () => {
    const email = 'email@test.com';
    const code = 'code';
    const { sut, userRepositoryStub } = makeSut();
    jest
      .spyOn(userRepositoryStub, 'getUserByEmailWithVerificationCode')
      .mockResolvedValueOnce(
        Promise.resolve({ ...testUserModel, verifiedEmail: false }),
      );

    const result = await sut.execute({ email, code });

    expect(result).toBe(email);
  });
});
