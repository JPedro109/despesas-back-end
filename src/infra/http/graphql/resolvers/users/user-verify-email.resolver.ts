import { Resolver, Args, Mutation, Context } from '@nestjs/graphql';
import { AbstractLogService } from '@/core/ports';
import { AbstractUserVerifyEmailUseCase } from '@/core/domain/users/abstracts';
import { UserVerifyEmailInput } from '@/infra/http/graphql/inputs';
import { AbstractGraphQL } from '@/infra/http/graphql/abstract';

@Resolver()
export class UserVerifyEmailResolver extends AbstractGraphQL {
  constructor(
    protected readonly useCase: AbstractUserVerifyEmailUseCase,
    protected readonly logService: AbstractLogService,
  ) {
    super(useCase, logService);
  }

  @Mutation(() => String, { name: 'userVerifyEmail' })
  async handle(@Context() context, @Args('data') body: UserVerifyEmailInput) {
    const { email, code } = body;

    return await this.handler(
      { email, code },
      context.req.path,
      context.req.method,
    );
  }
}
