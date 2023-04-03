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
import { AbstractUpdateUserPasswordUseCase } from '@/core/domain/users/abstracts';
import { AuthGuard } from '@nestjs/passport';
import { NotFoundError } from '@/core/errors';
import { UpdateUserPasswordResponseDTO } from '@/core/domain/users/dtos';
import { UpdateUserPasswordBodyDTO } from '@/infra/http/dtos';

@Controller('api/users')
export class UpdateUserPasswordController {
  constructor(private readonly _useCase: AbstractUpdateUserPasswordUseCase) {}

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

    const response = await this._useCase.execute({
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
