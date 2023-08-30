import { GraphQLError } from 'graphql';
import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { AbstractUpdateExpenseUseCase } from '@/core/domain/expenses/abstracts';
import { UpdateExpenseInput } from '@/infra/http/graphql/inputs';
import { GqlAuthGuard } from '@/infra/authentication/guards';
import { ExpenseType } from '@/infra/http/graphql/types';

@Resolver()
export class UpdateExpenseResolver {
  constructor(private readonly useCase: AbstractUpdateExpenseUseCase) {}

  @UseGuards(GqlAuthGuard)
  @Mutation(() => ExpenseType, { name: 'updateExpense' })
  async handle(@Args('data') body: UpdateExpenseInput) {
    const { id, expenseName, expenseValue, dueDate } = body;

    const response = await this.useCase.execute({
      id,
      expenseName,
      expenseValue,
      dueDate,
    });

    if (response instanceof Error)
      throw new GraphQLError(response.message, {
        extensions: { code: response.name },
      });

    return response;
  }
}
