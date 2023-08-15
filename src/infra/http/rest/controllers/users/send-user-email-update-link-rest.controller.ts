import {
  Body,
  Controller,
  BadRequestException,
  HttpCode,
  Patch,
  UseGuards,
  Req,
} from '@nestjs/common';
import {
  ApiExtraModels,
  ApiOperation,
  ApiResponse,
  ApiTags,
  getSchemaPath,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { AbstractSendUserEmailUpdateLinkUseCase } from '@/core/domain/users/abstracts';
import { SendUserEmailUpdateLinkResponseDTO } from '@/core/domain/users/dtos';
import {
  ErrorDTO,
  InternalServerErrorDTO,
  SendUserEmailUpdateLinkBodyDTO,
} from '@/infra/http/rest/dtos';

@ApiTags('Users')
@Controller('api/users')
export class SendUserEmailUpdateLinkRestController {
  constructor(
    private readonly useCase: AbstractSendUserEmailUpdateLinkUseCase,
  ) {}

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
  ): Promise<SendUserEmailUpdateLinkResponseDTO> {
    const { email } = body;

    const userId = req.user;

    const response = await this.useCase.execute({
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
