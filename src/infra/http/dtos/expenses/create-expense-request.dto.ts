import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsNumber, IsDateString } from 'class-validator';

export class CreateExpenseUserBodyDTO {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  expenseName: string;
  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  expenseValue: number;
  @IsNotEmpty()
  @IsDateString()
  @ApiProperty()
  dueDate: Date;
}
