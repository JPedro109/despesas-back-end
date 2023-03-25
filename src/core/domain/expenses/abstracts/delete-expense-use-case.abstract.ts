import { DeleteExpenseDTO, DeleteExpenseResponseDTO } from '../dtos';

export abstract class AbstractDeleteExpenseUseCase {
  abstract execute({ id }: DeleteExpenseDTO): Promise<DeleteExpenseResponseDTO>;
}
