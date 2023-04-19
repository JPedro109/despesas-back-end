import { UserVerifyEmailDTO, UserVerifyEmailResponseDTO } from '../dtos';

export abstract class AbstractUserVerifyEmailUseCase {
  abstract execute({
    email,
    code,
  }: UserVerifyEmailDTO): Promise<UserVerifyEmailResponseDTO>;
}
