import { GraphQLError } from 'graphql';
import { Resolver, Args, Mutation, Context } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { AbstractSendUserEmailUpdateLinkUseCase } from '@/core/domain/users/abstracts';
import { SendUserEmailUpdateLinkResponseDTO } from '@/core/domain/users/dtos';
import { SendUserEmailUpdateLinkInput } from '@/infra/http/graphql/inputs';
import { GqlAuthGuard } from '@/infra/authentication/guards';

@Resolver()
export class SendUserEmailUpdateLinkResolver {
  constructor(
    private readonly useCase: AbstractSendUserEmailUpdateLinkUseCase,
  ) {}

  @UseGuards(GqlAuthGuard)
  @Mutation(() => String, { name: 'sendUserEmailUpdateLink' })
  async handle(
    @Context() context,
    @Args('data')
    body: SendUserEmailUpdateLinkInput,
  ): Promise<SendUserEmailUpdateLinkResponseDTO> {
    const { email } = body;

    const userId = context.req.user;

    const response = await this.useCase.execute({
      id: userId,
      email,
    });

    if (response instanceof Error)
      throw new GraphQLError(response.message, {
        extensions: { code: response.name },
      });

    return Object(response);
  }
}
