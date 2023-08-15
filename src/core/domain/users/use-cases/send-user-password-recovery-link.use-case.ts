import { Injectable } from '@nestjs/common';
import { APP_URL } from '@/shared';
import { AbstractGenerationService, AbstractMailService } from '@/core/ports';
import { NotFoundError } from '@/core/errors';
import {
  AbstractUserRepository,
  AbstractUserVerificationCodeRepository,
} from '../repositories';
import { AbstractSendUserPasswordRecoveryLinkUseCase } from '../abstracts';
import {
  SendUserPasswordRecoveryLinkDTO,
  SendUserPasswordRecoveryLinkResponseDTO,
} from '../dtos';

@Injectable()
export class SendUserPasswordRecoveryLinkUseCase
  implements AbstractSendUserPasswordRecoveryLinkUseCase
{
  constructor(
    private readonly userRepository: AbstractUserRepository,
    private readonly userVerificationCodeRepository: AbstractUserVerificationCodeRepository,
    private readonly generation: AbstractGenerationService,
    private readonly mailService: AbstractMailService,
  ) {}

  async execute({
    email,
  }: SendUserPasswordRecoveryLinkDTO): Promise<SendUserPasswordRecoveryLinkResponseDTO> {
    const user = await this.userRepository.getUserByEmail(email);

    if (!user) return new NotFoundError('Email não cadastrado');

    const verificationCode = this.generation.code();

    const verificationTokenExpiryDate = this.generation.codeExpirationDate(10);

    await this.userVerificationCodeRepository.createUserVerificationCode(
      verificationCode,
      verificationTokenExpiryDate,
      true,
      user.id,
    );

    await this.mailService.sendMail(
      email,
      'Recuperação de Senha',
      'recover-password-body',
      {
        appUrl: APP_URL,
        email: email,
        code: verificationCode,
      },
    );

    return email;
  }
}
