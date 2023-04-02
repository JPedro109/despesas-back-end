import {
  Body,
  Controller,
  NotFoundException,
  HttpCode,
  Patch,
} from '@nestjs/common';
import { NotFoundError } from '@/core/errors';
import { AbstractSendUserPasswordRecoveryLinkUseCase } from '@/core/domain/users/abstracts';
import { SendUserPasswordRecoveryLinkResponseDTO } from '@/core/domain/users/dtos';
import { SendUserPasswordRecoveryLinkBodyDTO } from '@/infra/http/dtos';

@Controller('api/users')
export class SendUserPasswordRecoveryLinkController {
  constructor(
    private readonly _useCase: AbstractSendUserPasswordRecoveryLinkUseCase,
  ) {}

  @HttpCode(200)
  @Patch('send-password-recovery-link')
  async handle(
    @Body()
    body: SendUserPasswordRecoveryLinkBodyDTO,
  ): Promise<SendUserPasswordRecoveryLinkResponseDTO> {
    const { email } = body;

    const response = await this._useCase.execute({
      email,
    });

    if (response instanceof NotFoundError)
      throw new NotFoundException(response.message, {
        cause: response,
        description: response.name,
      });

    return Object(response);
  }
}
