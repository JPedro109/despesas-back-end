import {
  GenerationStub,
  MailServiceStub,
  UserRepositoryStub,
  UserVerificationCodeRepositoryStub,
  testUserModel,
} from '../../__mocks__';

import { NotFoundError } from '@/core/errors';
import { SendUserPasswordRecoveryLinkUseCase } from '@/core/domain/users/use-cases';

const makeSut = () => {
  const userRepositoryStub = new UserRepositoryStub();
  const userVerificationCodeRepositoryStub =
    new UserVerificationCodeRepositoryStub();
  const generationStub = new GenerationStub();
  const mailServiceStub = new MailServiceStub();
  const sut = new SendUserPasswordRecoveryLinkUseCase(
    userRepositoryStub,
    userVerificationCodeRepositoryStub,
    generationStub,
    mailServiceStub,
  );

  return {
    sut,
    userRepositoryStub,
    mailServiceStub,
  };
};

describe('Use case - SendUserPasswordRecoveryLinkUseCase', () => {
  test('Shoud not send user password recovery link, because user is not exists', async () => {
    const email = 'email@test2.com';
    const { sut } = makeSut();

    const result = await sut.execute({ email });

    expect(result).toBeInstanceOf(NotFoundError);
  });

  test('Shoud send user password recovery link', async () => {
    const email = 'email@test.com';
    const { sut, userRepositoryStub } = makeSut();
    jest
      .spyOn(userRepositoryStub, 'getUserByEmail')
      .mockResolvedValueOnce(Promise.resolve(testUserModel));

    const result = await sut.execute({ email });

    expect(result).toBe(email);
  });
});
