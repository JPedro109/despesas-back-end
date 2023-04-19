import {
  InvalidDueDateError,
  InvalidExpenseNameError,
  InvalidExpenseValueError,
} from '@/core/domain/expenses/entities';
import { ExpenseModel } from '@/core/domain/expenses/models';

export type CreateExpenseResponseDTO =
  | ExpenseModel
  | InvalidExpenseNameError
  | InvalidExpenseValueError
  | InvalidDueDateError;
