import { Module } from '@nestjs/common';
import { JsonWebTokenModule } from '@/infra';
import { UsersModule } from '@/core/domain/users/users.module';
import { ExpensesModule } from '@/core/domain/expenses/expense.module';
import {
  CreateExpenseController,
  CreateUserController,
  DeleteExpenseController,
  DeleteUserController,
  GetExpensesController,
  RecoverUserPasswordController,
  SendUserEmailUpdateLinkController,
  SendUserPasswordRecoveryLinkController,
  UpdateExpenseController,
  UpdateUserEmailController,
  UpdateUserPasswordController,
  UserLoginController,
  UserVerifyEmailController,
} from './controllers';

@Module({
  imports: [UsersModule, ExpensesModule, JsonWebTokenModule],
  controllers: [
    CreateUserController,
    DeleteUserController,
    RecoverUserPasswordController,
    SendUserEmailUpdateLinkController,
    SendUserPasswordRecoveryLinkController,
    UpdateUserEmailController,
    UpdateUserPasswordController,
    UserLoginController,
    UserVerifyEmailController,
    CreateExpenseController,
    UpdateExpenseController,
    DeleteExpenseController,
    GetExpensesController,
  ],
})
export class HttpModule {}
