import { DeleteUserDTO, DeleteUserResponseDTO } from '../dtos';

export abstract class AbstractDeleteUserUseCase {
  abstract execute({
    id,
    password,
    passwordConfirm,
  }: DeleteUserDTO): Promise<DeleteUserResponseDTO>;
}
