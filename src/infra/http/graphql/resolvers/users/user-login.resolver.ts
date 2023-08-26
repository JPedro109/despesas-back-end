import { GraphQLError } from 'graphql';
import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { AbstractUserLoginUseCase } from '@/core/domain/users/abstracts';
import { UserLoginResponseDTO } from '@/core/domain/users/dtos';
import { UserLoginInput } from '@/infra/http/graphql/inputs';

@Resolver()
export class UserLoginResolver {
  constructor(private readonly useCase: AbstractUserLoginUseCase) {}

  @Mutation(() => String, { name: 'userLogin' })
  async handle(
    @Args('data') body: UserLoginInput,
  ): Promise<UserLoginResponseDTO> {
    const { email, password } = body;

    const response = await this.useCase.execute({
      email,
      password,
    });

    if (response instanceof Error)
      throw new GraphQLError(response.message, {
        extensions: { code: response.name },
      });

    return Object(response);
  }
}
