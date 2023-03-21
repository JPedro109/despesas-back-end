import { Injectable } from '@nestjs/common';
import { Password } from '@/core/domain/users/entities';
import { AbstractUnitOfWork, AbstractCryptographyService } from '@/core/ports';
import { InvalidParamError, NotFoundError } from '@/core/errors';
import { AbstractRecoverUserPasswordUseCase } from '../abstracts';
import {
  RecoverUserPasswordDTO,
  RecoverUserPasswordResponseDTO,
} from '../dtos';

@Injectable()
export class RecoverUserPasswordUseCase
  implements AbstractRecoverUserPasswordUseCase
{
  constructor(
    private readonly unitOfWork: AbstractUnitOfWork,
    private readonly cryptography: AbstractCryptographyService,
  ) {}

  async execute({
    email,
    code,
    password,
    passwordConfirm,
  }: RecoverUserPasswordDTO): Promise<RecoverUserPasswordResponseDTO> {
    const userRepository = this.unitOfWork.getUserRepository();
    const userVerificationCodeRepository =
      this.unitOfWork.getUserVerificationCodeRepository();

    if (password !== passwordConfirm)
      return new InvalidParamError('As senhas não coincidem');

    const passwordOrError = Password.create(password);

    if (passwordOrError instanceof Error) return passwordOrError;

    const user = await userRepository.getUserByEmailWithVerificationCode(
      email,
      code,
      true,
    );

    if (!user) return new NotFoundError('Email não cadastrado');

    if (!user.userVerificationCode)
      return new InvalidParamError('Código inválido');

    if (Date.now() > user.userVerificationCode.verificationCodeExpiryDate)
      return new InvalidParamError('Código expirado');

    const passwordEqual = await this.cryptography.compareHash(
      user.password,
      passwordOrError.value,
    );

    if (passwordEqual)
      return new InvalidParamError(
        'A sua nova senha não pode ser igual a anterior',
      );

    const hashPassword = await this.cryptography.hash(passwordOrError.value);

    await this.unitOfWork.transaction(async () => {
      await userRepository.updateUserByEmail(email, { password: hashPassword });
      await userVerificationCodeRepository.invalidateUserValidationCode(code);
    });

    return email;
  }
}
