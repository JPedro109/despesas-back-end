import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DATABASE_NOSQL_URL } from '@/shared';
import { AbstractUnitOfWork, AbstractLogRepository } from '@/core/ports';
import {
  AbstractUserRepository,
  AbstractUserVerificationCodeRepository,
} from '@/core/domain/users/repositories';
import { AbstractExpenseRepository } from '@/core/domain/expenses/repositories';
import {
  DatabaseService,
  UserRepository,
  ExpenseRepository,
  UserVerificationCodeRepository,
  UnitOfWork,
  MockRepository,
} from './prisma';
import { LogRepository, LogSchema } from './mongoose';

@Module({
  imports: [
    MongooseModule.forRoot(DATABASE_NOSQL_URL, {
      dbName: 'log',
    }),
    MongooseModule.forFeature([{ name: 'expense-log', schema: LogSchema }]),
  ],
  providers: [
    DatabaseService,
    {
      provide: AbstractUserRepository,
      useClass: UserRepository,
    },
    {
      provide: AbstractUserVerificationCodeRepository,
      useClass: UserVerificationCodeRepository,
    },
    {
      provide: AbstractExpenseRepository,
      useClass: ExpenseRepository,
    },
    {
      provide: AbstractUnitOfWork,
      useClass: UnitOfWork,
    },
    {
      provide: AbstractLogRepository,
      useClass: LogRepository,
    },
    MockRepository,
  ],
  exports: [
    DatabaseService,
    {
      provide: AbstractUserRepository,
      useClass: UserRepository,
    },
    {
      provide: AbstractUserVerificationCodeRepository,
      useClass: UserVerificationCodeRepository,
    },
    {
      provide: AbstractExpenseRepository,
      useClass: ExpenseRepository,
    },
    {
      provide: AbstractUnitOfWork,
      useClass: UnitOfWork,
    },
    {
      provide: AbstractLogRepository,
      useClass: LogRepository,
    },
    MockRepository,
  ],
})
export class DatabaseModule {}
