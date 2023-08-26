import { GraphQLError } from 'graphql';
import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { AbstractCreateUserUseCase } from '@/core/domain/users/abstracts';
import { CreateUserResponseDTO } from '@/core/domain/users/dtos';
import { CreateUserInput } from '@/infra/http/graphql/inputs';

@Resolver()
export class CreateUserResolver {
  constructor(private readonly useCase: AbstractCreateUserUseCase) {}

  @Mutation(() => String, { name: 'createUser' })
  async handle(
    @Args('data') body: CreateUserInput,
  ): Promise<CreateUserResponseDTO> {
    const { email, password, passwordConfirm } = body;

    const response = await this.useCase.execute({
      email,
      password,
      passwordConfirm,
    });

    if (response instanceof Error)
      throw new GraphQLError(response.message, {
        extensions: { code: response.name },
      });

    return response;
  }
}
