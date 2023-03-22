import { Injectable } from '@nestjs/common';
import { InvalidParamError, NotFoundError } from '@/core/errors';
import { AbstractUnitOfWork } from '@/core/ports';
import { AbstractUpdateUserEmailUseCase } from '../abstracts';
import { UpdateUserEmailDTO, UpdateUserEmailResponseDTO } from '../dtos';

@Injectable()
export class UpdateUserEmailUseCase implements AbstractUpdateUserEmailUseCase {
  constructor(private readonly unitOfWork: AbstractUnitOfWork) {}

  async execute({
    id,
    email,
    code,
  }: UpdateUserEmailDTO): Promise<UpdateUserEmailResponseDTO> {
    const userRepository = this.unitOfWork.getUserRepository();
    const userVerificationCodeRepository =
      this.unitOfWork.getUserVerificationCodeRepository();

    const user = await userRepository.getUserByIdWithVerificationCode(
      id,
      code,
      false,
    );

    if (!user) return new NotFoundError('Usuário não existe');

    if (!user.userVerificationCode)
      return new InvalidParamError('Código inválido');

    if (Date.now() > user.userVerificationCode.verificationCodeExpiryDate)
      return new InvalidParamError('Código expirado');

    await this.unitOfWork.transaction(async () => {
      await userRepository.updateUserById(id, { email });
      await userVerificationCodeRepository.invalidateUserValidationCode(code);
    });

    return id;
  }
}
