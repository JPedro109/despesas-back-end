import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class SendUserPasswordRecoveryLinkInput {
  @Field(() => String)
  email: string;
}
