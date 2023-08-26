import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class UpdateUserPasswordInput {
  @Field(() => String)
  password: string;
  @Field(() => String)
  newPassword: string;
  @Field(() => String)
  newPasswordConfirm: string;
}
