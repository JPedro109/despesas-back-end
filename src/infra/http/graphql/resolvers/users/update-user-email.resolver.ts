import { GraphQLError } from 'graphql';
import { Resolver, Args, Mutation, Context } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { AbstractUpdateUserEmailUseCase } from '@/core/domain/users/abstracts';
import { UpdateUserEmailResponseDTO } from '@/core/domain/users/dtos';
import { UpdateUserEmailInput } from '@/infra/http/graphql/inputs';
import { GqlAuthGuard } from '@/infra/authentication/guards';

@Resolver()
export class UpdateUserEmailResolver {
  constructor(private readonly useCase: AbstractUpdateUserEmailUseCase) {}

  @UseGuards(GqlAuthGuard)
  @Mutation(() => String, { name: 'updateUserEmail' })
  async handle(
    @Context() context,
    @Args('data')
    body: UpdateUserEmailInput,
  ): Promise<UpdateUserEmailResponseDTO> {
    const { email, code } = body;

    const userId = context.req.user;

    const response = await this.useCase.execute({
      id: userId,
      email,
      code,
    });

    if (response instanceof Error)
      throw new GraphQLError(response.message, {
        extensions: { code: response.name },
      });

    return Object(response);
  }
}
