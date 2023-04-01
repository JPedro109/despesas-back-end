import { IsNotEmpty, IsString } from 'class-validator';

export class CreateUserBodyDTO {
  @IsNotEmpty()
  @IsString()
  email: string;
  @IsNotEmpty()
  @IsString()
  password: string;
  @IsNotEmpty()
  @IsString()
  passwordConfirm: string;
}
