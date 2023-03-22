import { Injectable } from '@nestjs/common';
import { InvalidParamError, NotFoundError } from '@/core/errors';
import { Password } from '@/core/domain/users/entities';
import { AbstractCryptographyService } from '@/core/ports';
import { AbstractUserRepository } from '../repositories';
import { AbstractUpdateUserPasswordUseCase } from '../abstracts';
import { UpdateUserPasswordDTO, UpdateUserPasswordResponseDTO } from '../dtos';

@Injectable()
export class UpdateUserPasswordUseCase
  implements AbstractUpdateUserPasswordUseCase
{
  constructor(
    private readonly repository: AbstractUserRepository,
    private readonly cryptography: AbstractCryptographyService,
  ) {}

  async execute({
    id,
    password,
    newPassword,
    newPasswordConfirm,
  }: UpdateUserPasswordDTO): Promise<UpdateUserPasswordResponseDTO> {
    if (newPassword !== newPasswordConfirm)
      return new InvalidParamError('As senhas não coincidem');

    const newPasswordOrError = Password.create(newPassword);

    if (newPasswordOrError instanceof Error) return newPasswordOrError;

    const user = await this.repository.getUserById(id);

    if (!user) return new NotFoundError('Usuário não existe');

    const passwordIsMatch = await this.cryptography.compareHash(
      user.password,
      password,
    );

    if (!passwordIsMatch) return new InvalidParamError('Senha atual incorreta');

    if (password === newPasswordOrError.value)
      return new InvalidParamError(
        'A sua nova senha não pode ser igual a anterior',
      );

    const hashPassword = await this.cryptography.hash(newPasswordOrError.value);

    await this.repository.updateUserById(id, { password: hashPassword });

    return id;
  }
}
