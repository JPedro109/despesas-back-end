import { Injectable } from '@nestjs/common';
import { APP_URL } from '@/shared';
import { Email } from '@/core/domain/users/entities';
import {
  AbstractGenerationService,
  AbstractMailService,
  EmailBody,
} from '@/core/ports';
import { InvalidParamError, NotFoundError } from '@/core/errors';
import {
  AbstractUserRepository,
  AbstractUserVerificationCodeRepository,
} from '../repositories';
import { AbstractSendUserEmailUpdateLinkUseCase } from '../abstracts';
import {
  SendUserEmailUpdateLinkDTO,
  SendUserEmailUpdateLinkResponseDTO,
} from '../dtos';

@Injectable()
export class SendUserEmailUpdateLinkUseCase
  implements AbstractSendUserEmailUpdateLinkUseCase
{
  constructor(
    private readonly userRepository: AbstractUserRepository,
    private readonly userVerificationCodeRepository: AbstractUserVerificationCodeRepository,
    private readonly generation: AbstractGenerationService,
    private readonly mailService: AbstractMailService,
  ) {}

  async execute({
    id,
    email,
  }: SendUserEmailUpdateLinkDTO): Promise<SendUserEmailUpdateLinkResponseDTO> {
    const emailOrError = Email.create(email);

    if (emailOrError instanceof Error) return emailOrError;

    const user = await this.userRepository.getUserById(id);

    if (!user) return new NotFoundError('Usuário não existe');

    const emailExists = await this.userRepository.getUserByEmail(
      emailOrError.value,
    );

    if (emailExists) return new InvalidParamError('Email já cadastrado');

    const verificationCode = this.generation.code();

    const verificationCodeExpiryDate = this.generation.codeExpirationDate(10);

    await this.userVerificationCodeRepository.createUserVerificationCode(
      verificationCode,
      verificationCodeExpiryDate,
      false,
      user.id,
    );

    await this.mailService.sendMail(
      emailOrError.value,
      'Atualização de E-mail',
      EmailBody.UpdateEmailBody,
      {
        appUrl: APP_URL,
        email: emailOrError.value,
        code: verificationCode,
      },
    );

    return emailOrError.value;
  }
}
