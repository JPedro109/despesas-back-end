import { Resolver, Args, Mutation, Context } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { AbstractLogService } from '@/core/ports';
import { AbstractDeleteUserUseCase } from '@/core/domain/users/abstracts';
import { DeleteUserInput } from '@/infra/http/graphql/inputs';
import { GqlAuthGuard } from '@/infra/authentication/guards';
import { AbstractGraphQL } from '@/infra/http/graphql/abstract';

@Resolver()
export class DeleteUserResolver extends AbstractGraphQL {
  constructor(
    protected readonly useCase: AbstractDeleteUserUseCase,
    protected readonly logService: AbstractLogService,
  ) {
    super(useCase, logService);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => String, { name: 'deleteUser' })
  async handle(@Context() context, @Args('data') body: DeleteUserInput) {
    const { password, passwordConfirm } = body;

    const userId = context.req.user;

    return await this.handler(
      { id: userId, password, passwordConfirm },
      context.req.path,
      context.req.method,
    );
  }
}
