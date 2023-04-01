import {
  Body,
  Controller,
  Delete,
  BadRequestException,
  HttpCode,
  UseGuards,
  Req,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AbstractDeleteUserUseCase } from '@/core/domain/users/abstracts';
import { DeleteUserResponseDTO } from '@/core/domain/users/dtos';
import { DeleteUserBodyDTO } from '@/infra/http/dtos';

@Controller('api/users')
export class DeleteUserController {
  constructor(private readonly _useCase: AbstractDeleteUserUseCase) {}

  @UseGuards(AuthGuard('jwt'))
  @HttpCode(200)
  @Delete()
  async handle(
    @Req() req,
    @Body() body: DeleteUserBodyDTO,
  ): Promise<DeleteUserResponseDTO> {
    const { password, passwordConfirm } = body;

    const userId = req.user;

    const response = await this._useCase.execute({
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
