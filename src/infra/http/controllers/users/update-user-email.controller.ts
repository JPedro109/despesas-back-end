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
import { AuthGuard } from '@nestjs/passport';
import { AbstractUpdateUserEmailUseCase } from '@/core/domain/users/abstracts';
import { UpdateUserEmailResponseDTO } from '@/core/domain/users/dtos';
import { UpdateUserEmailBodyDTO } from '@/infra/http/dtos';
import { NotFoundError } from '@/core/errors';

@Controller('api/users')
export class UpdateUserEmailController {
  constructor(private readonly _useCase: AbstractUpdateUserEmailUseCase) {}

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
