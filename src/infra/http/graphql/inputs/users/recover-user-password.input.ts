import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class RecoverUserPasswordInput {
  @Field(() => String)
  email: string;
  @Field(() => String)
  code: string;
  @Field(() => String)
  password: string;
  @Field(() => String)
  passwordConfirm: string;
}
