import { CreateUserDTO, CreateUserResponseDTO } from '../dtos';

export abstract class AbstractCreateUserUseCase {
  abstract execute({
    email,
    password,
    passwordConfirm,
  }: CreateUserDTO): Promise<CreateUserResponseDTO>;
}
