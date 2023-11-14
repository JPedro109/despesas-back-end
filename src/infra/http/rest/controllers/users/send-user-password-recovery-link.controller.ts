import { Body, Controller, HttpCode, Patch, Req } from '@nestjs/common';
import {
  ApiExtraModels,
  ApiOperation,
  ApiResponse,
  ApiTags,
  getSchemaPath,
} from '@nestjs/swagger';
import { AbstractLogService } from '@/core/ports';
import { AbstractSendUserPasswordRecoveryLinkUseCase } from '@/core/domain/users/abstracts';
import {
  ErrorDTO,
  InternalServerErrorDTO,
  SendUserPasswordRecoveryLinkBodyDTO,
} from '@/infra/http/rest/dtos';
import { AbstractRest } from '@/infra/http/rest/abstract';

@ApiTags('Users')
@Controller('api/users')
export class SendUserPasswordRecoveryLinkController extends AbstractRest {
  constructor(
    protected readonly useCase: AbstractSendUserPasswordRecoveryLinkUseCase,
    protected readonly logService: AbstractLogService,
  ) {
    super(useCase, logService);
  }
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
    @Req() req,
    @Body()
    body: SendUserPasswordRecoveryLinkBodyDTO,
  ) {
    const { email } = body;

    return await this.handler(
      {
        email,
      },
      req.path,
      req.method,
    );
  }
}
