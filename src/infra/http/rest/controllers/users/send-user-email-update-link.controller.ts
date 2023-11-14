import {
  Body,
  Controller,
  HttpCode,
  Patch,
  UseGuards,
  Req,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiExtraModels,
  ApiOperation,
  ApiResponse,
  ApiTags,
  getSchemaPath,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { AbstractLogService } from '@/core/ports';
import { AbstractSendUserEmailUpdateLinkUseCase } from '@/core/domain/users/abstracts';
import {
  ErrorDTO,
  InternalServerErrorDTO,
  SendUserEmailUpdateLinkBodyDTO,
} from '@/infra/http/rest/dtos';
import { AbstractRest } from '@/infra/http/rest/abstract';

@ApiTags('Users')
@ApiBearerAuth()
@Controller('api/users')
export class SendUserEmailUpdateLinkController extends AbstractRest {
  constructor(
    protected readonly useCase: AbstractSendUserEmailUpdateLinkUseCase,
    protected readonly logService: AbstractLogService,
  ) {
    super(useCase, logService);
  }

  @ApiOperation({ summary: 'Enviar link de atualização de email.' })
  @ApiResponse({
    status: 200,
    description: 'Rota de envio do link de atualização de email',
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
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(200)
  @Patch('send-email-update-link')
  async handle(
    @Req() req,
    @Body()
    body: SendUserEmailUpdateLinkBodyDTO,
  ) {
    const { email } = body;

    const userId = req.user;

    return await this.handler(
      {
        id: userId,
        email,
      },
      req.path,
      req.method,
    );
  }
}
