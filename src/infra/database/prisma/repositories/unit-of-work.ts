import { Injectable, Scope } from '@nestjs/common';
import {
  AbstractUserRepository,
  AbstractUserVerificationCodeRepository,
} from '@/core/domain/users/repositories';
import { AbstractExpenseRepository } from '@/core/domain/expenses/repositories';
import { AbstractUnitOfWork } from '@/core/ports';
import { DatabaseService } from '@/infra/database/prisma';
import { Context } from '../types';

@Injectable({ scope: Scope.TRANSIENT })
export class UnitOfWork implements AbstractUnitOfWork {
  constructor(
    private readonly prisma: DatabaseService,
    private readonly userRepository: AbstractUserRepository,
    private readonly userVerificationCodeRepository: AbstractUserVerificationCodeRepository,
    private readonly expenseRepository: AbstractExpenseRepository,
  ) {}

  private setContext(context: Context) {
    this.userRepository.setContext(context);
    this.userVerificationCodeRepository.setContext(context);
    this.expenseRepository.setContext(context);
  }

  async transaction(querys: () => Promise<void>) {
    await this.prisma.$transaction(async (context) => {
      this.setContext(context);
      await querys();
    });

    this.setContext(this.prisma);
  }

  getUserRepository(): AbstractUserRepository {
    return this.userRepository;
  }

  getUserVerificationCodeRepository(): AbstractUserVerificationCodeRepository {
    return this.userVerificationCodeRepository;
  }

  getExpenseRepository(): AbstractExpenseRepository {
    return this.expenseRepository;
  }
}
