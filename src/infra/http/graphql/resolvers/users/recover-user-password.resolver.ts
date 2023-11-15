import { Resolver, Args, Mutation, Context } from '@nestjs/graphql';
import { AbstractLogService } from '@/core/ports';
import { AbstractRecoverUserPasswordUseCase } from '@/core/domain/users/abstracts';
import { RecoverUserPasswordInput } from '@/infra/http/graphql/inputs';
import { AbstractGraphQL } from '@/infra/http/graphql/abstract';

@Resolver()
export class RecoverUserPasswordResolver extends AbstractGraphQL {
  constructor(
    protected readonly useCase: AbstractRecoverUserPasswordUseCase,
    protected readonly logService: AbstractLogService,
  ) {
    super(useCase, logService);
  }

  @Mutation(() => String, { name: 'recoverUserPassword' })
  async handle(
    @Context() context,
    @Args('data') body: RecoverUserPasswordInput,
  ) {
    const { password, passwordConfirm, email, code } = body;

    return await this.handler(
      { email, code, password, passwordConfirm },
      context.req.path,
      context.req.method,
    );
  }
}
