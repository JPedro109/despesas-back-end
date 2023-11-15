import { Resolver, Args, Mutation, Context } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { AbstractLogService } from '@/core/ports';
import { AbstractDeleteExpenseUseCase } from '@/core/domain/expenses/abstracts';
import { DeleteExpenseInput } from '@/infra/http/graphql/inputs';
import { GqlAuthGuard } from '@/infra/authentication/guards';
import { ExpenseType } from '@/infra/http/graphql/types';
import { AbstractGraphQL } from '@/infra/http/graphql/abstract';

@Resolver()
export class DeleteExpenseResolver extends AbstractGraphQL {
  constructor(
    protected readonly useCase: AbstractDeleteExpenseUseCase,
    protected readonly logService: AbstractLogService,
  ) {
    super(useCase, logService);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => ExpenseType, { name: 'deleteExpense' })
  async handle(@Context() context, @Args('data') body: DeleteExpenseInput) {
    const { id } = body;

    return await this.handler({ id }, context.req.path, context.req.method);
  }
}
