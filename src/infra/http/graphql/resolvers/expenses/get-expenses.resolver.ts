import { Context, Query, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { AbstractGetExpensesUseCase } from '@/core/domain/expenses/abstracts';
import { GqlAuthGuard } from '@/infra/authentication/guards';
import { ExpenseType } from '@/infra/http/graphql/types';

@Resolver()
export class GetExpensesResolver {
  constructor(private readonly useCase: AbstractGetExpensesUseCase) {}

  @UseGuards(GqlAuthGuard)
  @Query(() => [ExpenseType], { name: 'getExpenses' })
  async handle(@Context() context) {
    const userId = context.req.user;

    const response = await this.useCase.execute({
      userId,
    });

    return response;
  }
}
