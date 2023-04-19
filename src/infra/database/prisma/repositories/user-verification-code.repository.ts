import { Injectable, Scope } from '@nestjs/common';
import { user_verification_code as UserVerificationCodeRepositoryPrismaModel } from '@prisma/client';
import { AbstractUserVerificationCodeRepository } from '@/core/domain/users/repositories';
import { UserVerificationCodeModel } from '@/core/domain/users/models';
import { DatabaseService } from '@/infra/database/prisma';
import { Context } from '../types';

@Injectable({ scope: Scope.TRANSIENT })
export class UserVerificationCodeRepository
  implements AbstractUserVerificationCodeRepository
{
  constructor(private readonly prisma: DatabaseService) {}

  private context: Context = this.prisma;

  setContext(context: unknown): void {
    this.context = context as Context;
  }

  private toMapperUserVerificationCodeModel(
    userVerificationCodeRepository: UserVerificationCodeRepositoryPrismaModel,
  ) {
    return new UserVerificationCodeModel(
      userVerificationCodeRepository.id,
      userVerificationCodeRepository.user_id,
      userVerificationCodeRepository.verification_code,
      Number(userVerificationCodeRepository.verification_code_expiry_date),
      userVerificationCodeRepository.valid,
      userVerificationCodeRepository.password_recovery,
    );
  }

  async createUserVerificationCode(
    verificationCode: string,
    verificationCodeExpiryDate: number,
    passwordRecovery: boolean,
    userId: string,
  ): Promise<UserVerificationCodeModel> {
    const userVerificationCode =
      await this.context.user_verification_code.create({
        data: {
          verification_code: verificationCode,
          verification_code_expiry_date: verificationCodeExpiryDate,
          password_recovery: passwordRecovery,
          valid: true,
          user_id: userId,
        },
      });

    return this.toMapperUserVerificationCodeModel(userVerificationCode);
  }

  async invalidateUserValidationCode(
    verificationCode: string,
  ): Promise<UserVerificationCodeModel> {
    const userVerificationCode =
      await this.context.user_verification_code.update({
        data: {
          valid: false,
        },

        where: {
          verification_code: verificationCode,
        },
      });

    return this.toMapperUserVerificationCodeModel(userVerificationCode);
  }
}
