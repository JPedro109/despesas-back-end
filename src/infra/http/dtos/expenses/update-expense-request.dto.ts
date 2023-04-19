import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsNumber, IsDateString } from 'class-validator';

export class UpdateExpenseParamsDTO {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  id: string;
}

export class UpdateExpenseUserBodyDTO {
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
