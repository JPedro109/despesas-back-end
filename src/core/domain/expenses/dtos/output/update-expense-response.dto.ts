import {
  InvalidDueDateError,
  InvalidExpenseNameError,
  InvalidExpenseValueError,
} from '@/core/domain/expenses/entities';
import { NotFoundError } from '@/core/errors';
import { ExpenseModel } from '@/core/domain/expenses/models';

export type UpdateExpenseResponseDTO =
  | ExpenseModel
  | InvalidExpenseNameError
  | InvalidExpenseValueError
  | InvalidDueDateError
  | NotFoundError;
