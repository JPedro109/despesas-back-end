import { Test, TestingModule } from '@nestjs/testing';
import {
  DatabaseService,
  UserRepository,
  MockRepository,
} from '@/infra/database/prisma';

describe('Infra - UserRepository', () => {
  let app: TestingModule;
  let sut: UserRepository;
  let mockRepository: MockRepository;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      providers: [DatabaseService, UserRepository, MockRepository],
    }).compile();

    mockRepository = app.get<MockRepository>(MockRepository);
    sut = await app.resolve<UserRepository>(UserRepository);
  });

  beforeEach(async () => {
    await mockRepository.createMocksToTestRepository();
  });

  afterEach(async () => {
    await mockRepository.deleteMocks();
  });

  test('Should create user | createUser', async () => {
    const email = 'emailrepository@test.com';
    const hashPassword = 'hash_password';

    const result = await sut.createUser(email, hashPassword);

    expect(result.email).toBe(email);
  });

  test('Should get null | getUserById', async () => {
    const id = '0';

    const result = await sut.getUserById(id);

    expect(result).toBe(null);
  });

  test('Should get user | getUserById', async () => {
    const id = '5';

    const result = await sut.getUserById(id);

    expect(result.id).toBe(id);
  });

  test('Should get null | getUserByIdWithVerificationCode', async () => {
    const id = '0';

    const result = await sut.getUserByIdWithVerificationCode(
      id,
      'invalid_code',
      false,
    );

    expect(result).toBe(null);
  });

  test('Should get user | getUserByIdWithVerificationCode', async () => {
    const id = '5';

    const result = await sut.getUserByIdWithVerificationCode(
      id,
      'repository_code_one',
      false,
    );

    expect(result.id).toBe(id);
    expect(result.userVerificationCode).not.toBeNull();
  });

  test('Should get user with code null | getUserByIdWithVerificationCode', async () => {
    const id = '5';

    const result = await sut.getUserByIdWithVerificationCode(
      id,
      'invalid_code',
      false,
    );

    expect(result.id).toBe(id);
    expect(result.userVerificationCode).toBe(null);
  });

  test('Should get null | getUserByEmail', async () => {
    const email = 'email_not_exists@test.com';

    const result = await sut.getUserByEmail(email);

    expect(result).toBe(null);
  });

  test('Should get user | getUserByEmail', async () => {
    const email = 'email@test.com';

    const result = await sut.getUserByEmail(email);

    expect(result.email).toBe(email);
  });

  test('Should get null | getUserByEmailWithVerificationCode', async () => {
    const email = 'email_not_exists@test.com';

    const result = await sut.getUserByEmailWithVerificationCode(
      email,
      'invalid_code',
      false,
    );

    expect(result).toBe(null);
  });

  test('Should get user | getUserByEmailWithVerificationCode', async () => {
    const email = 'email@test.com';

    const result = await sut.getUserByEmailWithVerificationCode(
      email,
      'repository_code_one',
      false,
    );

    expect(result.email).toBe(email);
  });

  test('Should update user | updateUserById', async () => {
    const id = '5';
    const password = 'hash_password_two';

    const result = await sut.updateUserById(id, { password });

    expect(result.password).toBe(password);
  });

  test('Should update user | updateUserByEmail', async () => {
    const email = 'email@test.com';
    const password = 'hash_password_two';

    const result = await sut.updateUserByEmail(email, { password });

    expect(result.password).toBe(password);
  });

  test('Should delete user | deleteUserById', async () => {
    const id = '5';

    const result = await sut.deleteUserById(id);

    expect(result.id).toBe(id);
  });
});
