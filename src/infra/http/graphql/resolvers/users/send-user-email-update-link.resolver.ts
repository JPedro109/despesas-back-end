import { Resolver, Args, Mutation, Context } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { AbstractLogService } from '@/core/ports';
import { AbstractSendUserEmailUpdateLinkUseCase } from '@/core/domain/users/abstracts';
import { SendUserEmailUpdateLinkInput } from '@/infra/http/graphql/inputs';
import { GqlAuthGuard } from '@/infra/authentication/guards';
import { AbstractGraphQL } from '@/infra/http/graphql/abstract';

@Resolver()
export class SendUserEmailUpdateLinkResolver extends AbstractGraphQL {
  constructor(
    protected readonly useCase: AbstractSendUserEmailUpdateLinkUseCase,
    protected readonly logService: AbstractLogService,
  ) {
    super(useCase, logService);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => String, { name: 'sendUserEmailUpdateLink' })
  async handle(
    @Context() context,
    @Args('data')
    body: SendUserEmailUpdateLinkInput,
  ) {
    const { email } = body;

    const userId = context.req.user;

    return await this.handler(
      { id: userId, email },
      context.req.path,
      context.req.method,
    );
  }
}
