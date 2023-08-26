import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class UserVerifyEmailInput {
  @Field(() => String)
  email: string;
  @Field(() => String)
  code: string;
}
