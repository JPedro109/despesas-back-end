import {
  AbstractUserRepository,
  AbstractUserVerificationCodeRepository,
} from '@/core/domain/users/repositories';
import { AbstractExpenseRepository } from '@/core/domain/expenses/repositories';

export abstract class AbstractUnitOfWork {
  abstract transaction(querys: () => Promise<void>): Promise<void>;
  abstract getUserRepository(): AbstractUserRepository;
  abstract getUserVerificationCodeRepository(): AbstractUserVerificationCodeRepository;
  abstract getExpenseRepository(): AbstractExpenseRepository;
}
