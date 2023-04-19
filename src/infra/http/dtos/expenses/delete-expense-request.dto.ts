import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class DeleteExpenseParamsDTO {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  id: string;
}
