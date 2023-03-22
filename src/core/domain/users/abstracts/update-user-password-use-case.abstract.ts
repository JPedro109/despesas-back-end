import { UpdateUserPasswordDTO, UpdateUserPasswordResponseDTO } from '../dtos';

export abstract class AbstractUpdateUserPasswordUseCase {
  abstract execute({
    id,
    password,
    newPassword,
    newPasswordConfirm,
  }: UpdateUserPasswordDTO): Promise<UpdateUserPasswordResponseDTO>;
}
