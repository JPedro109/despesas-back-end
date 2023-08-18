import {
  Body,
  Controller,
  Delete,
  BadRequestException,
  HttpCode,
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
import { AbstractDeleteUserUseCase } from '@/core/domain/users/abstracts';
import { DeleteUserResponseDTO } from '@/core/domain/users/dtos';
import {
  DeleteUserBodyDTO,
  ErrorDTO,
  InternalServerErrorDTO,
} from '@/infra/http/rest/dtos';

@ApiTags('Users')
@Controller('api/users')
export class DeleteUserController {
  constructor(private readonly useCase: AbstractDeleteUserUseCase) {}

  @ApiOperation({ summary: 'Deletar usuário.' })
  @ApiResponse({
    status: 201,
    description: 'Rota de criação de usuário',
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
  @Delete()
  async handle(
    @Req() req,
    @Body() body: DeleteUserBodyDTO,
  ): Promise<DeleteUserResponseDTO> {
    const { password, passwordConfirm } = body;

    const userId = req.user;

    const response = await this.useCase.execute({
      id: userId,
      password,
      passwordConfirm,
    });

    if (response instanceof Error)
      throw new BadRequestException(response.message, {
        cause: response,
        description: response.name,
      });

    return Object(response);
  }
}
