import { IsNotEmpty, IsString } from 'class-validator';

export class DeleteUserBodyDTO {
  @IsNotEmpty()
  @IsString()
  password: string;
  @IsNotEmpty()
  @IsString()
  passwordConfirm: string;
}
