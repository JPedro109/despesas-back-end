import { Injectable } from '@nestjs/common';
import {
  AbstractCryptographyService,
  AbstractJsonWebTokenService,
} from '@/core/ports';
import { UnauthorizedError } from '@/core/errors';
import { AbstractUserRepository } from '../repositories';
import { AbstractUserLoginUseCase } from '../abstracts';
import { UserLoginDTO, UserLoginResponseDTO } from '../dtos';

@Injectable()
export class UserLoginUseCase implements AbstractUserLoginUseCase {
  constructor(
    private repository: AbstractUserRepository,
    private cryptography: AbstractCryptographyService,
    private jsonWebToken: AbstractJsonWebTokenService,
  ) {}

  async execute({
    email,
    password,
  }: UserLoginDTO): Promise<UserLoginResponseDTO> {
    const user = await this.repository.getUserByEmail(email);

    if (!user) return new UnauthorizedError('Email ou senha incorreto(s)');

    const passwordIsEqual = await this.cryptography.compareHash(
      user.password,
      password,
    );

    if (!passwordIsEqual)
      return new UnauthorizedError('Email ou senha incorreto(s)');

    if (!user.verifiedEmail)
      return new UnauthorizedError('Email não está verificado');

    return await this.jsonWebToken.createToken({ sub: user.id, email }, 86400);
  }
}
