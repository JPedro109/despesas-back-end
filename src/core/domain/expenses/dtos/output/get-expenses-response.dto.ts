import { NotFoundError } from '@/core/errors';
import { ExpenseModel } from '@/core/domain/expenses/models';

export type GetExpensesResponseDTO = ExpenseModel[] | NotFoundError;
