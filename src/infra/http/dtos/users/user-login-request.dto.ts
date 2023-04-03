import { IsNotEmpty, IsString } from 'class-validator';

export class UserLoginBodyDTO {
  @IsNotEmpty()
  @IsString()
  email: string;
  @IsNotEmpty()
  @IsString()
  password: string;
}
