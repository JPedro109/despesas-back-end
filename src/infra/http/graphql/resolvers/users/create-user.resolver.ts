import { Resolver, Args, Mutation, Context } from '@nestjs/graphql';
import { AbstractLogService } from '@/core/ports';
import { AbstractCreateUserUseCase } from '@/core/domain/users/abstracts';
import { CreateUserInput } from '@/infra/http/graphql/inputs';
import { AbstractGraphQL } from '@/infra/http/graphql/abstract';

@Resolver()
export class CreateUserResolver extends AbstractGraphQL {
  constructor(
    protected readonly useCase: AbstractCreateUserUseCase,
    protected readonly logService: AbstractLogService,
  ) {
    super(useCase, logService);
  }

  @Mutation(() => String, { name: 'createUser' })
  async handle(@Context() context, @Args('data') body: CreateUserInput) {
    const { email, password, passwordConfirm } = body;

    return await this.handler(
      { email, password, passwordConfirm },
      context.req.path,
      context.req.method,
    );
  }
}
