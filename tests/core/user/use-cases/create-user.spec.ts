import {
  CryptographyStub,
  ExpenseRepositoryStub,
  GenerationStub,
  MailServiceStub,
  UnitOfWorkStub,
  UserRepositoryStub,
  UserVerificationCodeRepositoryStub,
  testUserModel,
} from '../../__mocks__';

import { InvalidParamError } from '@/core/errors';
import { CreateUserUseCase } from '@/core/domain/users/use-cases';

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
  const mailServiceStub = new MailServiceStub();
  const cryptographyStub = new CryptographyStub();
  const generationStub = new GenerationStub();
  const sut = new CreateUserUseCase(
    unitOfWorkStub,
    mailServiceStub,
    cryptographyStub,
    generationStub,
  );

  return {
    sut,
    userRepositoryStub,
  };
};

describe('Use case - CreateUserUseCase', () => {
  test('Shoud not create user, because passwords is not match', async () => {
    const email = 'email@test2.com';
    const password = 'Password1234';
    const invalidPasswordConfirm = 'Password123456';
    const { sut } = makeSut();

    const result = await sut.execute({
      email,
      password,
      passwordConfirm: invalidPasswordConfirm,
    });

    expect(result).toBeInstanceOf(InvalidParamError);
  });

  test('Shoud not create user, because email already is exists', async () => {
    const email = 'email@test.com';
    const password = 'Password1234';
    const passwordConfirm = 'Password1234';
    const { sut, userRepositoryStub } = makeSut();
    jest
      .spyOn(userRepositoryStub, 'getUserByEmail')
      .mockReturnValueOnce(Promise.resolve(testUserModel));

    const result = await sut.execute({
      email,
      password,
      passwordConfirm,
    });

    expect(result).toBeInstanceOf(InvalidParamError);
  });

  test('Shoud not create user, because the user rules are not respects', async () => {
    const email = 'emailtest2.com';
    const password = 'password';
    const passwordConfirm = 'password';
    const { sut } = makeSut();

    const result = await sut.execute({
      email,
      password,
      passwordConfirm,
    });

    expect(result).toBeInstanceOf(Error);
  });

  test('Shoud create user', async () => {
    const email = 'email@test2.com';
    const password = 'Password1234';
    const passwordConfirm = 'Password1234';
    const { sut } = makeSut();

    const result = await sut.execute({
      email,
      password,
      passwordConfirm,
    });

    expect(result).toBe(email);
  });
});
