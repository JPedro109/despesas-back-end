import { UpdateUserEmailDTO, UpdateUserEmailResponseDTO } from '../dtos';

export abstract class AbstractUpdateUserEmailUseCase {
  abstract execute({
    id,
    email,
    code,
  }: UpdateUserEmailDTO): Promise<UpdateUserEmailResponseDTO>;
}
