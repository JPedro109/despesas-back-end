import { Resolver, Args, Mutation, Context } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { AbstractLogService } from '@/core/ports';
import { AbstractUpdateUserEmailUseCase } from '@/core/domain/users/abstracts';
import { UpdateUserEmailInput } from '@/infra/http/graphql/inputs';
import { GqlAuthGuard } from '@/infra/authentication/guards';
import { AbstractGraphQL } from '@/infra/http/graphql/abstract';

@Resolver()
export class UpdateUserEmailResolver extends AbstractGraphQL {
  constructor(
    protected readonly useCase: AbstractUpdateUserEmailUseCase,
    protected readonly logService: AbstractLogService,
  ) {
    super(useCase, logService);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => String, { name: 'updateUserEmail' })
  async handle(
    @Context() context,
    @Args('data')
    body: UpdateUserEmailInput,
  ) {
    const { email, code } = body;

    const userId = context.req.user;

    return await this.handler(
      { id: userId, email, code },
      context.req.path,
      context.req.method,
    );
  }
}
