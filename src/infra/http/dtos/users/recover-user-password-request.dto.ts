import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class RecoverUserPasswordQueryDTO {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  email: string;
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  code: string;
}

export class RecoverUserPasswordBodyDTO {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  password: string;
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  passwordConfirm: string;
}
