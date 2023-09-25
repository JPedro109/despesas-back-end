import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class DeleteExpenseInput {
  @Field(() => String)
  id: string;
}
