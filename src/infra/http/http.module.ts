import { Module } from '@nestjs/common';
import { AuthenticationModule } from '@/infra';
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
} from './rest/controllers';

@Module({
  imports: [UsersModule, ExpensesModule, AuthenticationModule],
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
