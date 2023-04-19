import { Injectable } from '@nestjs/common';
import { NotFoundError } from '@/core/errors';
import { AbstractExpenseRepository } from '../repositories';
import { AbstractDeleteExpenseUseCase } from '../abstracts';
import { DeleteExpenseDTO, DeleteExpenseResponseDTO } from '../dtos';

@Injectable()
export class DeleteExpenseUseCase implements AbstractDeleteExpenseUseCase {
  constructor(private readonly repository: AbstractExpenseRepository) {}

  async execute({ id }: DeleteExpenseDTO): Promise<DeleteExpenseResponseDTO> {
    const expense = await this.repository.getExpenseById(id);

    if (!expense) return new NotFoundError('Essa despesas não existe');

    return this.repository.deleteExpenseById(id);
  }
}
