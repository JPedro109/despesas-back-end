import {
  Query,
  Controller,
  HttpCode,
  Patch,
  BadRequestException,
  UseGuards,
  Req,
  NotFoundException,
} from '@nestjs/common';
import {
  ApiExtraModels,
  ApiOperation,
  ApiResponse,
  ApiTags,
  getSchemaPath,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { AbstractUpdateUserEmailUseCase } from '@/core/domain/users/abstracts';
import { UpdateUserEmailResponseDTO } from '@/core/domain/users/dtos';
import {
  ErrorDTO,
  InternalServerErrorDTO,
  UpdateUserEmailBodyDTO,
} from '@/infra/http/dtos';
import { NotFoundError } from '@/core/errors';

@ApiTags('Users')
@Controller('api/users')
export class UpdateUserEmailController {
  constructor(private readonly _useCase: AbstractUpdateUserEmailUseCase) {}

  @ApiOperation({ summary: 'Atualizar email' })
  @ApiResponse({
    status: 200,
    description: 'Rota de atualização de email',
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
  @Patch('email')
  async handle(
    @Req() req,
    @Query()
    body: UpdateUserEmailBodyDTO,
  ): Promise<UpdateUserEmailResponseDTO> {
    const { email, code } = body;

    const userId = req.user;

    const response = await this._useCase.execute({
      id: userId,
      email,
      code,
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
