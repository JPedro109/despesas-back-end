import { GraphQLError } from 'graphql';
import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { AbstractRecoverUserPasswordUseCase } from '@/core/domain/users/abstracts';
import { RecoverUserPasswordResponseDTO } from '@/core/domain/users/dtos';
import { RecoverUserPasswordInput } from '@/infra/http/graphql/inputs';

@Resolver()
export class RecoverUserPasswordResolver {
  constructor(private readonly useCase: AbstractRecoverUserPasswordUseCase) {}

  @Mutation(() => String, { name: 'recoverUserPassword' })
  async handle(
    @Args('data') body: RecoverUserPasswordInput,
  ): Promise<RecoverUserPasswordResponseDTO> {
    const { password, passwordConfirm, email, code } = body;

    const response = await this.useCase.execute({
      email,
      code,
      password,
      passwordConfirm,
    });

    if (response instanceof Error)
      throw new GraphQLError(response.message, {
        extensions: { code: response.name },
      });

    return Object(response);
  }
}
