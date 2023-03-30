import { Injectable } from '@nestjs/common';
import { DatabaseService } from '@/infra/database/prisma';
import { Context } from '../types';

@Injectable()
export class MockRepository {
  constructor(private readonly prisma: DatabaseService) {}

  private context: Context = this.prisma;

  async createMocksToTestRoutes() {
    await this.context.user.create({
      data: {
        id: '1',
        email: 'email_verified@test.com',
        password:
          '$2a$12$rCgSXPpqhjyB3m8FrCPh3eojDo6ozQ0kAc/Mb7eGgvNYNngrmJTyS', //Password1234
        verified_email: true,
        created_at: new Date(),
        updated_at: null,
      },
    });

    await this.context.user_verification_code.create({
      data: {
        id: '1',
        verification_code: 'email_code',
        verification_code_expiry_date: 9999999999999,
        user_id: '1',
        valid: true,
        password_recovery: false,
      },
    });

    await this.context.user_verification_code.create({
      data: {
        id: '2',
        verification_code: 'password_code',
        verification_code_expiry_date: 9999999999999,
        user_id: '1',
        valid: true,
        password_recovery: true,
      },
    });

    await this.context.user.create({
      data: {
        id: '2',
        email: 'email_verified_code_expiry@test.com',
        password:
          '$2a$12$rCgSXPpqhjyB3m8FrCPh3eojDo6ozQ0kAc/Mb7eGgvNYNngrmJTyS', //Password1234
        verified_email: true,
        created_at: new Date(),
        updated_at: null,
      },
    });

    await this.context.user_verification_code.create({
      data: {
        id: '3',
        verification_code: 'email_code_expiry',
        verification_code_expiry_date: 0,
        user_id: '2',
        valid: true,
        password_recovery: false,
      },
    });

    await this.context.user_verification_code.create({
      data: {
        id: '4',
        verification_code: 'password_code_expiry',
        verification_code_expiry_date: 0,
        user_id: '2',
        valid: true,
        password_recovery: true,
      },
    });

    await this.context.user.create({
      data: {
        id: '3',
        email: 'email_not_verified@test.com',
        password:
          '$2a$12$rCgSXPpqhjyB3m8FrCPh3eojDo6ozQ0kAc/Mb7eGgvNYNngrmJTyS', //Password1234
        verified_email: false,
        created_at: new Date(),
        updated_at: null,
      },
    });

    await this.context.user_verification_code.create({
      data: {
        id: '5',
        verification_code: 'email_verification_code',
        verification_code_expiry_date: 9999999999999,
        user_id: '3',
        valid: true,
        password_recovery: false,
      },
    });

    await this.context.expense.create({
      data: {
        id: '4',
        expense_name: 'expense',
        expense_value: 100,
        due_date: new Date('3000-01-01 '),
        user_id: '1',
        created_at: new Date(),
        updated_at: null,
      },
    });
  }

  async createMocksToTestRepository() {
    await this.context.user.create({
      data: {
        id: '5',
        email: 'email@test.com',
        password: 'hash_password',
        verified_email: false,
        created_at: new Date(),
        updated_at: null,
      },
    });

    await this.context.user_verification_code.create({
      data: {
        id: '7',
        verification_code: 'repository_code_one',
        verification_code_expiry_date: 0,
        user_id: '5',
        valid: true,
        password_recovery: false,
      },
    });

    await this.context.expense.create({
      data: {
        id: '6',
        expense_name: 'expense',
        expense_value: 100,
        due_date: new Date('3000-01-01 21:00:00'),
        user_id: '5',
        created_at: new Date(),
        updated_at: null,
      },
    });
  }

  async deleteMocks() {
    await this.context.expense.deleteMany();
    await this.context.user_verification_code.deleteMany();
    await this.context.user.deleteMany();
  }
}
