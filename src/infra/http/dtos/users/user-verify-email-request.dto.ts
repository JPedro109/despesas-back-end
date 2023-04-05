import { IsNotEmpty, IsString } from 'class-validator';

export class UserVerifyEmailQueryDTO {
  @IsNotEmpty()
  @IsString()
  email: string;
  @IsNotEmpty()
  @IsString()
  code: string;
}
