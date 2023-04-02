import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateUserEmailBodyDTO {
  @IsNotEmpty()
  @IsString()
  email: string;
  @IsNotEmpty()
  @IsString()
  code: string;
}
