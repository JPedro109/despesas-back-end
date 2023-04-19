export class UserVerificationCodeModel {
  constructor(
    public readonly id: string,
    public readonly userId: string,
    public readonly verificationCode: string,
    public readonly verificationCodeExpiryDate: number,
    public readonly valid: boolean,
    public readonly passwordRecovery: boolean,
  ) {}
}
