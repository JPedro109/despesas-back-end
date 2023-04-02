import { IsNotEmpty, IsString } from 'class-validator';

export class RecoverUserPasswordQueryDTO {
  @IsNotEmpty()
  @IsString()
  email: string;
  @IsNotEmpty()
  @IsString()
  code: string;
}

export class RecoverUserPasswordBodyDTO {
  @IsNotEmpty()
  @IsString()
  password: string;
  @IsNotEmpty()
  @IsString()
  passwordConfirm: string;
}
