import { CreateExpenseDTO, CreateExpenseResponseDTO } from '../dtos';

export abstract class AbstractCreateExpenseUseCase {
  abstract execute({
    expenseName,
    expenseValue,
    dueDate,
  }: CreateExpenseDTO): Promise<CreateExpenseResponseDTO>;
}
