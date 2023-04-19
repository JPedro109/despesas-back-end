import { Test, TestingModule } from '@nestjs/testing';
import {
  DatabaseService,
  UserVerificationCodeRepository,
  MockRepository,
} from '@/infra/database/prisma';

describe('External - UserVerificationCodeRepository', () => {
  let app: TestingModule;
  let sut: UserVerificationCodeRepository;
  let mockRepository: MockRepository;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      providers: [
        DatabaseService,
        UserVerificationCodeRepository,
        MockRepository,
      ],
    }).compile();

    mockRepository = app.get<MockRepository>(MockRepository);
    sut = await app.resolve<UserVerificationCodeRepository>(
      UserVerificationCodeRepository,
    );
  });

  beforeEach(async () => {
    await mockRepository.createMocksToTestRepository();
  });

  afterEach(async () => {
    await mockRepository.deleteMocks();
  });
  test('Should create verification code | createUserVerificationCode', async () => {
    const verificationCode = await sut.createUserVerificationCode(
      '123456',
      0,
      false,
      '5',
    );

    expect(verificationCode.verificationCode).toBe('123456');
    expect(verificationCode.verificationCodeExpiryDate).toBe(0);
  });

  test('Should invalid verification code | createUserVerificationCode', async () => {
    const verificationCode = await sut.invalidateUserValidationCode(
      'repository_code_one',
    );

    expect(verificationCode.verificationCode).toBe('repository_code_one');
    expect(verificationCode.verificationCodeExpiryDate).toBe(0);
  });
});
