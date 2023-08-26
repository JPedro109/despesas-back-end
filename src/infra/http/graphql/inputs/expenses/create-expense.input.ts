import { InputType, Field } from '@nestjs/graphql';
import { IsDate } from 'class-validator';

@InputType()
export class CreateExpenseInput {
  @Field(() => String)
  expenseName: string;
  @Field(() => Number)
  expenseValue: number;
  @Field(() => Date)
  @IsDate()
  dueDate: Date;
}
