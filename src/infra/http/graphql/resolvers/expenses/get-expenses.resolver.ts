import { Context, Query, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { AbstractLogService } from '@/core/ports';
import { AbstractGetExpensesUseCase } from '@/core/domain/expenses/abstracts';
import { GqlAuthGuard } from '@/infra/authentication/guards';
import { ExpenseType } from '@/infra/http/graphql/types';
import { AbstractGraphQL } from '@/infra/http/graphql/abstract';

@Resolver()
export class GetExpensesResolver extends AbstractGraphQL {
  constructor(
    protected readonly useCase: AbstractGetExpensesUseCase,
    protected readonly logService: AbstractLogService,
  ) {
    super(useCase, logService);
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => [ExpenseType], { name: 'getExpenses' })
  async handle(@Context() context) {
    const userId = context.req.user;

    return await this.handler({ userId }, context.req.path, context.req.method);
  }
}
