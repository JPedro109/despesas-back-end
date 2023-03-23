import { Injectable } from '@nestjs/common';
import {
  InvalidParamError,
  NotFoundError,
  UnauthorizedError,
} from '@/core/errors';
import { UserVerifyEmailDTO, UserVerifyEmailResponseDTO } from '../dtos';
import { AbstractUserVerifyEmailUseCase } from '../abstracts';
import { AbstractUserRepository } from '../repositories';

@Injectable()
export class UserVerifyEmailUseCase implements AbstractUserVerifyEmailUseCase {
  constructor(private readonly repository: AbstractUserRepository) {}

  async execute({
    email,
    code,
  }: UserVerifyEmailDTO): Promise<UserVerifyEmailResponseDTO> {
    const user = await this.repository.getUserByEmailWithVerificationCode(
      email,
      code,
      false,
    );

    if (!user) return new NotFoundError('Email não cadastrado');

    if (user.verifiedEmail) return new UnauthorizedError('Email já verificado');

    if (!user.userVerificationCode)
      return new InvalidParamError('Código inválido');

    await this.repository.updateUserByEmail(email, {
      verifiedEmail: true,
    });

    return email;
  }
}
