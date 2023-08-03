/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-unused-vars */

import {
  AbstractGenerationService,
  AbstractCryptographyService,
  AbstractMailService,
  AbstractAuthenticationService,
  JsonWebTokenType,
  AbstractUnitOfWork,
} from '@/core/ports';

import {
  AbstractUserRepository,
  AbstractUserVerificationCodeRepository,
} from '@/core/domain/users/repositories';
import {
  UserModel,
  UserVerificationCodeModel,
} from '@/core/domain/users/models';

import { AbstractExpenseRepository } from '@/core/domain/expenses/repositories';
import { ExpenseModel } from '@/core/domain/expenses/models';

import {
  testUserModel,
  testExpenseModel,
  testUserVerificationCodeModel,
} from '../datas';

export class UserRepositoryStub implements AbstractUserRepository {
  setContext(context: unknown): void {}

  async createUser(email: string, hashPassword: string): Promise<UserModel> {
    return testUserModel;
  }

  async getUserById(id: string): Promise<UserModel | null> {
    return testUserModel;
  }

  async getUserByEmail(email: string): Promise<UserModel | null> {
    return null;
  }

  async getUserByIdWithVerificationCode(
    id: string,
    verificationCode: string,
  ): Promise<UserModel> {
    return testUserModel;
  }

  async getUserByEmailWithVerificationCode(
    email: string,
    verificationCode: string,
  ): Promise<UserModel> {
    return null;
  }

  async updateUserById(
    id: string,
    data: Partial<UserModel>,
  ): Promise<UserModel> {
    return testUserModel;
  }

  async updateUserByEmail(
    email: string,
    data: Partial<UserModel>,
  ): Promise<UserModel> {
    return testUserModel;
  }

  async deleteUserById(id: string): Promise<UserModel> {
    return testUserModel;
  }
}

export class UserVerificationCodeRepositoryStub
  implements AbstractUserVerificationCodeRepository
{
  setContext(context: unknown): void {}

  async createUserVerificationCode(
    verificationCode: string,
    verificationCodeExpiryDate: number,
    passwordRecovery: boolean,
    userId: string,
  ): Promise<UserVerificationCodeModel> {
    return testUserVerificationCodeModel;
  }

  async invalidateUserValidationCode(
    verificationCode: string,
  ): Promise<UserVerificationCodeModel> {
    return testUserVerificationCodeModel;
  }
}

export class ExpenseRepositoryStub implements AbstractExpenseRepository {
  setContext(context: unknown): void {}

  async createExpense(
    expenseName: string,
    expenseValue: number,
    dueDate: Date,
    userId: string,
  ): Promise<ExpenseModel> {
    return testExpenseModel;
  }

  async getExpenseById(id: string): Promise<ExpenseModel | null> {
    return testExpenseModel;
  }

  async getExpensesByUserId(userId: string): Promise<ExpenseModel[]> {
    return [testExpenseModel];
  }

  async updateExpenseById(
    id: string,
    data: Partial<ExpenseModel>,
  ): Promise<ExpenseModel> {
    return testExpenseModel;
  }

  async deleteExpenseById(id: string): Promise<ExpenseModel> {
    return testExpenseModel;
  }
}

export class UnitOfWorkStub implements AbstractUnitOfWork {
  constructor(
    private readonly userRepository: AbstractUserRepository,
    private readonly userVerificationCodeRepository: AbstractUserVerificationCodeRepository,
    private readonly expenseRepository: AbstractExpenseRepository,
  ) {}

  async transaction(querys: () => Promise<void>) {
    await querys();
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

export class MailServiceStub implements AbstractMailService {
  async sendMail(
    to: string,
    subject: string,
    html: string,
    context?: object,
  ): Promise<void> {}
}

export class CryptographyStub implements AbstractCryptographyService {
  async hash(value: string): Promise<string> {
    return 'hash';
  }

  async compareHash(
    hashValue: string,
    valueToBeCompared: string,
  ): Promise<boolean> {
    return true;
  }
}

export class JsonWebTokenStub implements AbstractAuthenticationService {
  async createJsonWebToken(
    payload: object,
    expiryTimeInSeconds: number,
  ): Promise<string> {
    return 'jwt';
  }

  async verifyJsonWebToken(token: string): Promise<JsonWebTokenType> {
    return {
      id: '1',
      email: 'email@test.com',
    };
  }
}

export class GenerationStub implements AbstractGenerationService {
  code(): string {
    return 'code';
  }

  codeExpirationDate(timeInMinutes: number): number {
    return 1;
  }
}
