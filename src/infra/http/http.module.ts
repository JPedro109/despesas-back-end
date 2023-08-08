import { Module } from '@nestjs/common';
import { AuthenticationModule } from '@/infra';
import { UsersModule } from '@/core/domain/users/users.module';
import { ExpensesModule } from '@/core/domain/expenses/expense.module';
import {
  CreateExpenseRestController,
  CreateUserRestController,
  DeleteExpenseRestController,
  DeleteUserRestController,
  GetExpensesRestController,
  RecoverUserPasswordRestController,
  SendUserEmailUpdateLinkRestController,
  SendUserPasswordRecoveryLinkRestController,
  UpdateExpenseRestController,
  UpdateUserEmailRestController,
  UpdateUserPasswordRestController,
  UserLoginRestController,
  UserVerifyEmailRestController,
} from './controllers';

@Module({
  imports: [UsersModule, ExpensesModule, AuthenticationModule],
  controllers: [
    CreateUserRestController,
    DeleteUserRestController,
    RecoverUserPasswordRestController,
    SendUserEmailUpdateLinkRestController,
    SendUserPasswordRecoveryLinkRestController,
    UpdateUserEmailRestController,
    UpdateUserPasswordRestController,
    UserLoginRestController,
    UserVerifyEmailRestController,
    CreateExpenseRestController,
    UpdateExpenseRestController,
    DeleteExpenseRestController,
    GetExpensesRestController,
  ],
})
export class HttpModule {}
