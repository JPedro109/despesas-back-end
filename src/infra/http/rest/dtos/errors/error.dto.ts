import { ApiProperty } from '@nestjs/swagger';

export class ErrorDTO {
  @ApiProperty()
  statusCode: 400;
  @ApiProperty()
  message: string;
  @ApiProperty()
  error: string;
}
