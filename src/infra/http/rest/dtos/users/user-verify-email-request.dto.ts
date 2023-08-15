import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UserVerifyEmailQueryDTO {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  email: string;
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  code: string;
}
