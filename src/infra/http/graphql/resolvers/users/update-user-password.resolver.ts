import { GraphQLError } from 'graphql';
import { Resolver, Args, Mutation, Context } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { AbstractUpdateUserPasswordUseCase } from '@/core/domain/users/abstracts';
import { UpdateUserPasswordInput } from '@/infra/http/graphql/inputs';
import { GqlAuthGuard } from '@/infra/authentication/guards';

@Resolver()
export class UpdateUserPasswordResolver {
  constructor(private readonly useCase: AbstractUpdateUserPasswordUseCase) {}

  @UseGuards(GqlAuthGuard)
  @Mutation(() => String, { name: 'updateUserPassword' })
  async handle(
    @Context() context,
    @Args('data')
    body: UpdateUserPasswordInput,
  ) {
    const { password, newPassword, newPasswordConfirm } = body;

    const userId = context.req.user;

    const response = await this.useCase.execute({
      id: userId,
      password,
      newPassword,
      newPasswordConfirm,
    });

    if (response instanceof Error)
      throw new GraphQLError(response.message, {
        extensions: { code: response.name },
      });

    return Object(response);
  }
}
