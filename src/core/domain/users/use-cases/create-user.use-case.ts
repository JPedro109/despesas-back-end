import { Injectable } from '@nestjs/common';
import { APP_URL } from '@/shared';
import { User } from '@/core/domain/users/entities';
import {
  AbstractCryptographyService,
  AbstractGenerationService,
  AbstractMailService,
  AbstractUnitOfWork,
  EmailBody,
} from '@/core/ports';
import { InvalidParamError } from '@/core/errors';
import { AbstractCreateUserUseCase } from '../abstracts';
import { CreateUserDTO, CreateUserResponseDTO } from '../dtos';

@Injectable()
export class CreateUserUseCase implements AbstractCreateUserUseCase {
  constructor(
    private readonly unitOfWork: AbstractUnitOfWork,
    private readonly mailService: AbstractMailService,
    private readonly cryptography: AbstractCryptographyService,
    private readonly generation: AbstractGenerationService,
  ) {}

  async execute({
    email,
    password,
    passwordConfirm,
  }: CreateUserDTO): Promise<CreateUserResponseDTO> {
    const userRepository = this.unitOfWork.getUserRepository();
    const userVerificationCodeRepository =
      this.unitOfWork.getUserVerificationCodeRepository();

    if (password !== passwordConfirm)
      return new InvalidParamError('As senhas não coincidem');

    if (await userRepository.getUserByEmail(email))
      return new InvalidParamError('Email já cadastrado');

    const userOrError = User.create(email, password);

    if (userOrError instanceof Error) return userOrError;

    const hashPassword = await this.cryptography.hash(
      userOrError.password.value,
    );

    const code = this.generation.code();

    await this.unitOfWork.transaction(async () => {
      const user = await userRepository.createUser(
        userOrError.email.value,
        hashPassword,
      );
      await userVerificationCodeRepository.createUserVerificationCode(
        code,
        0,
        false,
        user.id,
      );
      await this.mailService.sendMail(
        userOrError.email.value,
        'Criação de Usuário',
        EmailBody.CreateUserBody,
        {
          appUrl: APP_URL,
          email: userOrError.email.value,
          code,
        },
      );
    });

    return userOrError.email.value;
  }
}
