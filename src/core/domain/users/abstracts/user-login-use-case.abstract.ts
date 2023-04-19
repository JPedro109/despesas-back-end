import { UserLoginDTO, UserLoginResponseDTO } from '../dtos';

export abstract class AbstractUserLoginUseCase {
  abstract execute({
    email,
    password,
  }: UserLoginDTO): Promise<UserLoginResponseDTO>;
}
