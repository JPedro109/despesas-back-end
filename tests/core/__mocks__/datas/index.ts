import {
  UserModel,
  UserVerificationCodeModel,
} from '@/core/domain/users/models';
import { ExpenseModel } from '@/core/domain/expenses/models';

export const testUserVerificationCodeModel = new UserVerificationCodeModel(
  '1',
  '1',
  'AAAAAAA',
  999999999999999,
  true,
  false,
);
export const testUserModel = new UserModel(
  '1',
  'email@teste.com',
  'hash_password',
  true,
  testUserVerificationCodeModel,
);

export const testExpenseModel = new ExpenseModel(
  '1',
  'expense',
  100,
  new Date('3000-01-01'),
  '1',
);
