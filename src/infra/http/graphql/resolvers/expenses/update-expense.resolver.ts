import { Resolver, Args, Mutation, Context } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { AbstractLogService } from '@/core/ports';
import { AbstractUpdateExpenseUseCase } from '@/core/domain/expenses/abstracts';
import { UpdateExpenseInput } from '@/infra/http/graphql/inputs';
import { GqlAuthGuard } from '@/infra/authentication/guards';
import { ExpenseType } from '@/infra/http/graphql/types';
import { AbstractGraphQL } from '@/infra/http/graphql/abstract';

@Resolver()
export class UpdateExpenseResolver extends AbstractGraphQL {
  constructor(
    protected readonly useCase: AbstractUpdateExpenseUseCase,
    protected readonly logService: AbstractLogService,
  ) {
    super(useCase, logService);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => ExpenseType, { name: 'updateExpense' })
  async handle(@Context() context, @Args('data') body: UpdateExpenseInput) {
    const { id, expenseName, expenseValue, dueDate } = body;

    return await this.handler(
      { id, expenseName, expenseValue, dueDate },
      context.req.path,
      context.req.method,
    );
  }
}
