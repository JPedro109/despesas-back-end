import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver } from '@nestjs/apollo';
import { GraphQLFormattedError } from 'graphql';
import { AuthenticationModule, LogModule } from '@/infra';
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
import {
  CreateExpenseResolver,
  CreateUserResolver,
  DeleteExpenseResolver,
  DeleteUserResolver,
  GetExpensesResolver,
  RecoverUserPasswordResolver,
  SendUserEmailUpdateLinkResolver,
  SendUserPasswordRecoveryLinkResolver,
  UpdateExpenseResolver,
  UpdateUserEmailResolver,
  UpdateUserPasswordResolver,
  UserLoginResolver,
  UserVerifyEmailResolver,
} from './graphql/resolvers';

@Module({
  imports: [
    LogModule,
    UsersModule,
    ExpensesModule,
    AuthenticationModule,
    GraphQLModule.forRoot({
      driver: ApolloDriver,
      playground: true,
      autoSchemaFile: true,
      context: ({ req }) => ({ headers: req.headers, userId: null }),
      formatError: (formattedError: GraphQLFormattedError) => {
        return {
          message: formattedError.message,
          code: formattedError.extensions.code,
        };
      },
    }),
  ],
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
  providers: [
    CreateExpenseResolver,
    CreateUserResolver,
    DeleteExpenseResolver,
    DeleteUserResolver,
    GetExpensesResolver,
    RecoverUserPasswordResolver,
    SendUserEmailUpdateLinkResolver,
    SendUserPasswordRecoveryLinkResolver,
    UpdateExpenseResolver,
    UpdateUserEmailResolver,
    UpdateUserPasswordResolver,
    UserLoginResolver,
    UserVerifyEmailResolver,
  ],
})
export class HttpModule {}
