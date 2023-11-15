import { Resolver, Args, Mutation, Context } from '@nestjs/graphql';
import { AbstractLogService } from '@/core/ports';
import { AbstractUserLoginUseCase } from '@/core/domain/users/abstracts';
import { UserLoginInput } from '@/infra/http/graphql/inputs';
import { AbstractGraphQL } from '@/infra/http/graphql/abstract';

@Resolver()
export class UserLoginResolver extends AbstractGraphQL {
  constructor(
    protected readonly useCase: AbstractUserLoginUseCase,
    protected readonly logService: AbstractLogService,
  ) {
    super(useCase, logService);
  }

  @Mutation(() => String, { name: 'userLogin' })
  async handle(@Context() context, @Args('data') body: UserLoginInput) {
    const { email, password } = body;

    return await this.handler(
      { email, password },
      context.req.path,
      context.req.method,
    );
  }
}
