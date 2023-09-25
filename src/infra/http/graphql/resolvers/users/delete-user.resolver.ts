import { GraphQLError } from 'graphql';
import { Resolver, Args, Mutation, Context } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { AbstractDeleteUserUseCase } from '@/core/domain/users/abstracts';
import { DeleteUserInput } from '@/infra/http/graphql/inputs';
import { GqlAuthGuard } from '@/infra/authentication/guards';

@Resolver()
export class DeleteUserResolver {
  constructor(private readonly useCase: AbstractDeleteUserUseCase) {}

  @UseGuards(GqlAuthGuard)
  @Mutation(() => String, { name: 'deleteUser' })
  async handle(@Context() context, @Args('data') body: DeleteUserInput) {
    const { password, passwordConfirm } = body;

    const userId = context.req.user;

    const response = await this.useCase.execute({
      id: userId,
      password,
      passwordConfirm,
    });

    if (response instanceof Error)
      throw new GraphQLError(response.message, {
        extensions: { code: response.name },
      });

    return Object(response);
  }
}
