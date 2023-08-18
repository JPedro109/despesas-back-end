import {
  Controller,
  BadRequestException,
  HttpCode,
  Patch,
  UseGuards,
  Req,
  Body,
  NotFoundException,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiExtraModels,
  ApiOperation,
  ApiResponse,
  ApiTags,
  getSchemaPath,
} from '@nestjs/swagger';
import { AbstractUpdateUserPasswordUseCase } from '@/core/domain/users/abstracts';
import { AuthGuard } from '@nestjs/passport';
import { NotFoundError } from '@/core/errors';
import { UpdateUserPasswordResponseDTO } from '@/core/domain/users/dtos';
import {
  ErrorDTO,
  InternalServerErrorDTO,
  UpdateUserPasswordBodyDTO,
} from '@/infra/http/rest/dtos';

@ApiTags('Users')
@ApiBearerAuth()
@Controller('api/users')
export class UpdateUserPasswordController {
  constructor(private readonly useCase: AbstractUpdateUserPasswordUseCase) {}

  @ApiOperation({ summary: 'Atualizar senha' })
  @ApiResponse({
    status: 200,
    description: 'Rota de atualização de senha',
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
  @Patch('password')
  async handle(
    @Req() req,
    @Body()
    body: UpdateUserPasswordBodyDTO,
  ): Promise<UpdateUserPasswordResponseDTO> {
    const { password, newPassword, newPasswordConfirm } = body;

    const userId = req.user;

    const response = await this.useCase.execute({
      id: userId,
      password,
      newPassword,
      newPasswordConfirm,
    });

    if (response instanceof NotFoundError)
      throw new NotFoundException(response.message, {
        cause: response,
        description: response.name,
      });

    if (response instanceof Error)
      throw new BadRequestException(response.message, {
        cause: response,
        description: response.name,
      });

    return Object(response);
  }
}
