import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ExpenseType {
  @Field(() => String)
  id: string;
  @Field(() => String)
  expenseName: string;
  @Field(() => Int)
  expenseValue: number;
  @Field(() => Date)
  dueDate: Date;
  @Field(() => String)
  userId: string;
}
