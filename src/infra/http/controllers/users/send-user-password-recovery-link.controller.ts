import {
  Body,
  Controller,
  NotFoundException,
  HttpCode,
  Patch,
} from '@nestjs/common';
import {
  ApiExtraModels,
  ApiOperation,
  ApiResponse,
  ApiTags,
  getSchemaPath,
} from '@nestjs/swagger';
import { NotFoundError } from '@/core/errors';
import { AbstractSendUserPasswordRecoveryLinkUseCase } from '@/core/domain/users/abstracts';
import { SendUserPasswordRecoveryLinkResponseDTO } from '@/core/domain/users/dtos';
import {
  ErrorDTO,
  InternalServerErrorDTO,
  SendUserPasswordRecoveryLinkBodyDTO,
} from '@/infra/http/dtos';

@ApiTags('Users')
@Controller('api/users')
export class SendUserPasswordRecoveryLinkController {
  constructor(
    private readonly _useCase: AbstractSendUserPasswordRecoveryLinkUseCase,
  ) {}

  @ApiOperation({ summary: 'Enviar link de recuperação de senha.' })
  @ApiResponse({
    status: 200,
    description: 'Rota de envio do link de recuperação de senha',
    type: String,
  })
  @ApiExtraModels(ErrorDTO)
  @ApiResponse({
    status: 400,
    schema: {
      $ref: getSchemaPath(ErrorDTO),
    },
    description: 'DTO inválido ou erro na regras de negócio',
  })
  @ApiResponse({
    status: 404,
    schema: {
      $ref: getSchemaPath(ErrorDTO),
    },
    description: 'Usuário não encontrado',
  })
  @ApiExtraModels(InternalServerErrorDTO)
  @ApiResponse({
    status: 500,
    schema: {
      $ref: getSchemaPath(InternalServerErrorDTO),
    },
    description: 'Erro no servidor',
  })
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
