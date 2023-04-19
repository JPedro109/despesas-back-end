import { UserVerificationCodeModel } from './user-verification-code.model';

export class UserModel {
  constructor(
    public readonly id: string,
    public readonly email: string,
    public readonly password: string,
    public readonly verifiedEmail: boolean,
    public readonly userVerificationCode?: UserVerificationCodeModel,
  ) {}
}
