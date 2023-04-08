import { IsNotEmpty, IsString, IsNumber, IsDateString } from 'class-validator';

export class UpdateExpenseParamsDTO {
  @IsNotEmpty()
  @IsString()
  id: string;
}

export class UpdateExpenseUserBodyDTO {
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
