import {
  RecoverUserPasswordDTO,
  RecoverUserPasswordResponseDTO,
} from '../dtos';

export abstract class AbstractRecoverUserPasswordUseCase {
  abstract execute({
    email,
    code,
    password,
    passwordConfirm,
  }: RecoverUserPasswordDTO): Promise<RecoverUserPasswordResponseDTO>;
}
