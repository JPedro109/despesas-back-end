import { GraphQLError } from 'graphql';
import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { AbstractSendUserPasswordRecoveryLinkUseCase } from '@/core/domain/users/abstracts';
import { SendUserPasswordRecoveryLinkResponseDTO } from '@/core/domain/users/dtos';
import { SendUserPasswordRecoveryLinkInput } from '@/infra/http/graphql/inputs';

@Resolver()
export class SendUserPasswordRecoveryLinkResolver {
  constructor(
    private readonly useCase: AbstractSendUserPasswordRecoveryLinkUseCase,
  ) {}

  @Mutation(() => String, { name: 'sendUserPasswordRecoveryLink' })
  async handle(
    @Args('data')
    body: SendUserPasswordRecoveryLinkInput,
  ): Promise<SendUserPasswordRecoveryLinkResponseDTO> {
    const { email } = body;

    const response = await this.useCase.execute({
      email,
    });

    if (response instanceof Error)
      throw new GraphQLError(response.message, {
        extensions: { code: response.name },
      });

    return Object(response);
  }
}
