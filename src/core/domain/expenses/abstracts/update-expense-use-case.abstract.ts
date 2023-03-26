import { UpdateExpenseDTO, UpdateExpenseResponseDTO } from '../dtos';

export abstract class AbstractUpdateExpenseUseCase {
  abstract execute({
    id,
    expenseName,
    expenseValue,
    dueDate,
  }: UpdateExpenseDTO): Promise<UpdateExpenseResponseDTO>;
}
