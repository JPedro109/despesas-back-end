import { ExpenseModel } from '@/core/domain/expenses/models';

export const testExpenseModel = new ExpenseModel(
  '1',
  'expense',
  100,
  new Date('3000-01-01'),
  '1',
);
