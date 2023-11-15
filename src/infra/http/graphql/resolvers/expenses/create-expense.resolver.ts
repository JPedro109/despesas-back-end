import { Resolver, Args, Mutation, Context } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { AbstractLogService } from '@/core/ports';
import { AbstractCreateExpenseUseCase } from '@/core/domain/expenses/abstracts';
import { CreateExpenseInput } from '@/infra/http/graphql/inputs';
import { GqlAuthGuard } from '@/infra/authentication/guards';
import { ExpenseType } from '@/infra/http/graphql/types';
import { AbstractGraphQL } from '@/infra/http/graphql/abstract';

@Resolver()
export class CreateExpenseResolver extends AbstractGraphQL {
  constructor(
    protected readonly useCase: AbstractCreateExpenseUseCase,
    protected readonly logService: AbstractLogService,
  ) {
    super(useCase, logService);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => ExpenseType, { name: 'createExpense' })
  async handle(@Context() context, @Args('data') body: CreateExpenseInput) {
    const { expenseName, expenseValue, dueDate } = body;

    const userId = context.req.user;

    return await this.handler(
      { expenseName, expenseValue, dueDate, userId },
      context.req.path,
      context.req.method,
    );
  }
}
