import {
  Body,
  Controller,
  BadRequestException,
  HttpCode,
  Patch,
  UseGuards,
  Req,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AbstractSendUserEmailUpdateLinkUseCase } from '@/core/domain/users/abstracts';
import { SendUserEmailUpdateLinkResponseDTO } from '@/core/domain/users/dtos';
import { SendUserEmailUpdateLinkBodyDTO } from '@/infra/http/dtos';

@Controller('api/users')
export class SendUserEmailUpdateLinkController {
  constructor(
    private readonly _useCase: AbstractSendUserEmailUpdateLinkUseCase,
  ) {}

  @UseGuards(AuthGuard('jwt'))
  @HttpCode(200)
  @Patch('send-email-update-link')
  async handle(
    @Req() req,
    @Body()
    body: SendUserEmailUpdateLinkBodyDTO,
  ): Promise<SendUserEmailUpdateLinkResponseDTO> {
    const { email } = body;

    const userId = req.user;

    const response = await this._useCase.execute({
      id: userId,
      email,
    });

    if (response instanceof Error)
      throw new BadRequestException(response.message, {
        cause: response,
        description: response.name,
      });

    return Object(response);
  }
}
