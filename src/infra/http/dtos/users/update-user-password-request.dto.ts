import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateUserPasswordBodyDTO {
  @IsNotEmpty()
  @IsString()
  password: string;
  @IsNotEmpty()
  @IsString()
  newPassword: string;
  @IsNotEmpty()
  @IsString()
  newPasswordConfirm: string;
}
