import { IsNotEmpty, IsString } from 'class-validator';

export class SendUserPasswordRecoveryLinkBodyDTO {
  @IsNotEmpty()
  @IsString()
  email: string;
}
