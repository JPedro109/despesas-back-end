import { UserVerificationCodeModel } from '../models';

export abstract class AbstractUserVerificationCodeRepository {
  abstract setContext(context: unknown): void;
  abstract createUserVerificationCode(
    verificationCode: string,
    verificationCodeExpiryDate: number,
    passwordRecovery: boolean,
    userId: string,
  ): Promise<UserVerificationCodeModel>;
  abstract invalidateUserValidationCode(
    verificationCode: string,
  ): Promise<UserVerificationCodeModel>;
}
