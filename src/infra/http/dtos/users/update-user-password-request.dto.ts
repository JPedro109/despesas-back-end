import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateUserPasswordBodyDTO {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  password: string;
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  newPassword: string;
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  newPasswordConfirm: string;
}
