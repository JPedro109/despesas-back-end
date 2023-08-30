import { GraphQLError } from 'graphql';
import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { AbstractUserVerifyEmailUseCase } from '@/core/domain/users/abstracts';
import { UserVerifyEmailInput } from '@/infra/http/graphql/inputs';

@Resolver()
export class UserVerifyEmailResolver {
  constructor(private readonly useCase: AbstractUserVerifyEmailUseCase) {}

  @Mutation(() => String, { name: 'userVerifyEmail' })
  async handle(@Args('data') body: UserVerifyEmailInput) {
    const { email, code } = body;

    const response = await this.useCase.execute({
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
