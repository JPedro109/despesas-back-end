import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class DeleteUserInput {
  @Field(() => String)
  password: string;
  @Field(() => String)
  passwordConfirm: string;
}
