import { Resolver, Args, Mutation, Context } from '@nestjs/graphql';
import { AbstractLogService } from '@/core/ports';
import { AbstractSendUserPasswordRecoveryLinkUseCase } from '@/core/domain/users/abstracts';
import { SendUserPasswordRecoveryLinkInput } from '@/infra/http/graphql/inputs';
import { AbstractGraphQL } from '@/infra/http/graphql/abstract';

@Resolver()
export class SendUserPasswordRecoveryLinkResolver extends AbstractGraphQL {
  constructor(
    protected readonly useCase: AbstractSendUserPasswordRecoveryLinkUseCase,
    protected readonly logService: AbstractLogService,
  ) {
    super(useCase, logService);
  }

  @Mutation(() => String, { name: 'sendUserPasswordRecoveryLink' })
  async handle(
    @Context() context,
    @Args('data')
    body: SendUserPasswordRecoveryLinkInput,
  ) {
    const { email } = body;

    return await this.handler({ email }, context.req.path, context.req.method);
  }
}
