import { GraphQLError } from 'graphql';
import { Resolver, Args, Mutation, Context } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { AbstractCreateExpenseUseCase } from '@/core/domain/expenses/abstracts';
import { CreateExpenseResponseDTO } from '@/core/domain/expenses/dtos';
import { CreateExpenseInput } from '@/infra/http/graphql/inputs';
import { GqlAuthGuard } from '@/infra/authentication/guards';
import { ExpenseType } from '@/infra/http/graphql/types';

@Resolver()
export class CreateExpenseResolver {
  constructor(private readonly useCase: AbstractCreateExpenseUseCase) {}

  @UseGuards(GqlAuthGuard)
  @Mutation(() => ExpenseType, { name: 'createExpense' })
  async handle(
    @Context() context,
    @Args('data') body: CreateExpenseInput,
  ): Promise<CreateExpenseResponseDTO> {
    const { expenseName, expenseValue, dueDate } = body;

    const userId = context.req.user;

    const response = await this.useCase.execute({
      expenseName,
      expenseValue,
      dueDate,
      userId,
    });

    if (response instanceof Error)
      throw new GraphQLError(response.message, {
        extensions: { code: response.name },
      });

    return response;
  }
}
