import { Injectable } from '@nestjs/common';
import { AbstractCryptographyService } from '@/core/ports';
import { InvalidParamError, NotFoundError } from '@/core/errors';
import { AbstractUserRepository } from '../repositories';
import { AbstractDeleteUserUseCase } from '../abstracts';
import { DeleteUserDTO, DeleteUserResponseDTO } from '../dtos';

@Injectable()
export class DeleteUserUseCase implements AbstractDeleteUserUseCase {
  constructor(
    private readonly repository: AbstractUserRepository,
    private readonly cryptography: AbstractCryptographyService,
  ) {}

  async execute({
    id,
    password,
    passwordConfirm,
  }: DeleteUserDTO): Promise<DeleteUserResponseDTO> {
    if (password !== passwordConfirm)
      return new InvalidParamError('As senhas não coincidem');

    const user = await this.repository.getUserById(id);

    if (!user) return new NotFoundError('Usuário não existe');

    const passwordIsEqual = await this.cryptography.compareHash(
      user.password,
      password,
    );

    if (!passwordIsEqual) return new InvalidParamError('Senha inválida');

    await this.repository.deleteUserById(id);

    return id;
  }
}
