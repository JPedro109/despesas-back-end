import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class SendUserEmailUpdateLinkInput {
  @Field(() => String)
  email: string;
}
