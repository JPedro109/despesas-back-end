import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class SendUserPasswordRecoveryLinkBodyDTO {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  email: string;
}
