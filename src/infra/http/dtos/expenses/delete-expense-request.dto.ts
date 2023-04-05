import { IsNotEmpty, IsString } from 'class-validator';

export class DeleteExpenseParamsDTO {
  @IsNotEmpty()
  @IsString()
  id: string;
}
