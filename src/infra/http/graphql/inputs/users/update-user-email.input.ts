import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class UpdateUserEmailInput {
  @Field(() => String)
  email: string;
  @Field(() => String)
  code: string;
}
