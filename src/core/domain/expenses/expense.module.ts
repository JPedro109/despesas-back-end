import { Module } from '@nestjs/common';
import { DatabaseModule } from '@/infra';
import {
  AbstractCreateExpenseUseCase,
  AbstractDeleteExpenseUseCase,
  AbstractGetExpensesUseCase,
  AbstractUpdateExpenseUseCase,
} from './abstracts';
import {
  CreateExpenseUseCase,
  UpdateExpenseUseCase,
  GetExpensesUseCase,
  DeleteExpenseUseCase,
} from './use-cases';

@Module({
  imports: [DatabaseModule],
  providers: [
    {
      provide: AbstractCreateExpenseUseCase,
      useClass: CreateExpenseUseCase,
    },
    {
      provide: AbstractUpdateExpenseUseCase,
      useClass: UpdateExpenseUseCase,
    },
    {
      provide: AbstractGetExpensesUseCase,
      useClass: GetExpensesUseCase,
    },
    {
      provide: AbstractDeleteExpenseUseCase,
      useClass: DeleteExpenseUseCase,
    },
  ],
  exports: [
    {
      provide: AbstractCreateExpenseUseCase,
      useClass: CreateExpenseUseCase,
    },
    {
      provide: AbstractUpdateExpenseUseCase,
      useClass: UpdateExpenseUseCase,
    },
    {
      provide: AbstractGetExpensesUseCase,
      useClass: GetExpensesUseCase,
    },
    {
      provide: AbstractDeleteExpenseUseCase,
      useClass: DeleteExpenseUseCase,
    },
  ],
})
export class ExpensesModule {}
