import { GetExpensesDTO, GetExpensesResponseDTO } from '../dtos';

export abstract class AbstractGetExpensesUseCase {
  abstract execute({ userId }: GetExpensesDTO): Promise<GetExpensesResponseDTO>;
}
