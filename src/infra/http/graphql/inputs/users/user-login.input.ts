import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class UserLoginInput {
  @Field(() => String)
  email: string;
  @Field(() => String)
  password: string;
}
