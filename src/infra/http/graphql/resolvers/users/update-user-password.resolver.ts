import { Resolver, Args, Mutation, Context } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { AbstractUpdateUserPasswordUseCase } from '@/core/domain/users/abstracts';
import { UpdateUserPasswordInput } from '@/infra/http/graphql/inputs';
import { GqlAuthGuard } from '@/infra/authentication/guards';
import { AbstractGraphQL } from '@/infra/http/graphql/abstract';
import { AbstractLogService } from '@/core/ports';

@Resolver()
export class UpdateUserPasswordResolver extends AbstractGraphQL {
  constructor(
    protected readonly useCase: AbstractUpdateUserPasswordUseCase,
    protected readonly logService: AbstractLogService,
  ) {
    super(useCase, logService);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => String, { name: 'updateUserPassword' })
  async handle(
    @Context() context,
    @Args('data')
    body: UpdateUserPasswordInput,
  ) {
    const { password, newPassword, newPasswordConfirm } = body;

    const userId = context.req.user;

    return await this.handler(
      { id: userId, password, newPassword, newPasswordConfirm },
      context.req.path,
      context.req.method,
    );
  }
}
