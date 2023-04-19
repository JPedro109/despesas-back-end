import { Test, TestingModule } from '@nestjs/testing';
import {
  DatabaseService,
  UserRepository,
  UserVerificationCodeRepository,
  ExpenseRepository,
  UnitOfWork,
} from '@/infra/database/prisma';
import { AbstractUnitOfWork } from '@/core/ports';
import {
  AbstractUserRepository,
  AbstractUserVerificationCodeRepository,
} from '@/core/domain/users/repositories';
import { AbstractExpenseRepository } from '@/core/domain/expenses/repositories';

describe('Infra - UnitOfWork', () => {
  let app: TestingModule;
  let sut: AbstractUnitOfWork;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      providers: [
        DatabaseService,
        {
          provide: AbstractUserRepository,
          useClass: UserRepository,
        },
        {
          provide: AbstractUserVerificationCodeRepository,
          useClass: UserVerificationCodeRepository,
        },
        {
          provide: AbstractExpenseRepository,
          useClass: ExpenseRepository,
        },
        {
          provide: AbstractUnitOfWork,
          useClass: UnitOfWork,
        },
      ],
    }).compile();
    sut = await app.resolve<AbstractUnitOfWork>(AbstractUnitOfWork);
  });

  test('Should get instances', async () => {
    expect(sut.getUserRepository()).toBeInstanceOf(UserRepository);
    expect(sut.getUserVerificationCodeRepository()).toBeInstanceOf(
      UserVerificationCodeRepository,
    );
    expect(sut.getExpenseRepository()).toBeInstanceOf(ExpenseRepository);
  });
});
