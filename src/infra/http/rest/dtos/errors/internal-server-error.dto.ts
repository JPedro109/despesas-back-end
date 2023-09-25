import { ApiProperty } from '@nestjs/swagger';

export class InternalServerErrorDTO {
  @ApiProperty()
  statusCode: number;
  @ApiProperty()
  message: string;
}
