import { IsNotEmpty, IsString } from 'class-validator';

export class SendUserEmailUpdateLinkBodyDTO {
  @IsNotEmpty()
  @IsString()
  email: string;
}
