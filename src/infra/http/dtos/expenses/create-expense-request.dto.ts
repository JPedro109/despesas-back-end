import { IsNotEmpty, IsString, IsNumber, IsDateString } from 'class-validator';

export class CreateExpenseUserBodyDTO {
  @IsNotEmpty()
  @IsString()
  expenseName: string;
  @IsNotEmpty()
  @IsNumber()
  expenseValue: number;
  @IsNotEmpty()
  @IsDateString()
  dueDate: Date;
}
