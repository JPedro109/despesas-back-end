import { GraphQLError } from 'graphql';
import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { AbstractDeleteExpenseUseCase } from '@/core/domain/expenses/abstracts';
import { DeleteExpenseResponseDTO } from '@/core/domain/expenses/dtos';
import { DeleteExpenseInput } from '@/infra/http/graphql/inputs';
import { GqlAuthGuard } from '@/infra/authentication/guards';
import { ExpenseType } from '@/infra/http/graphql/types';

@Resolver()
export class DeleteExpenseResolver {
  constructor(private readonly useCase: AbstractDeleteExpenseUseCase) {}

  @UseGuards(GqlAuthGuard)
  @Mutation(() => ExpenseType, { name: 'deleteExpense' })
  async handle(
    @Args('data') body: DeleteExpenseInput,
  ): Promise<DeleteExpenseResponseDTO> {
    const { id } = body;

    const response = await this.useCase.execute({
      id,
    });

    if (response instanceof Error)
      throw new GraphQLError(response.message, {
        extensions: { code: response.name },
      });

    return response;
  }
}
