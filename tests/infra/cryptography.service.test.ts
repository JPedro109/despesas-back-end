import { Test, TestingModule } from '@nestjs/testing';
import { CryptographyService } from '@/infra/cryptography/cryptography.service';

describe('Infra - CryptographyService', () => {
  let sut: CryptographyService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [CryptographyService],
    }).compile();

    sut = app.get<CryptographyService>(CryptographyService);
  });

  test('Should return the hash | hash', async () => {
    const password = 'Password1234';
    jest.spyOn(sut, 'hash');

    const result = await sut.hash(password);

    expect(result).not.toBe(password);
    expect(sut.hash).toHaveBeenCalled();
    expect(sut.hash).toHaveBeenCalledWith(password);
  });

  test('Should return false | compareHash', async () => {
    const password = 'Password1234';
    const hash = await sut.hash(password);
    jest.spyOn(sut, 'compareHash');

    const result = await sut.compareHash(hash, 'Password12345');

    expect(result).toBe(false);
    expect(sut.compareHash).toHaveBeenCalled();
    expect(sut.compareHash).toHaveBeenCalledWith(hash, 'Password12345');
  });

  test('Should return true | compareHash', async () => {
    const password = 'Password1234';
    const hash = await sut.hash(password);
    jest.spyOn(sut, 'compareHash');

    const result = await sut.compareHash(hash, password);

    expect(result).toBe(true);
    expect(sut.compareHash).toHaveBeenCalled();
    expect(sut.compareHash).toHaveBeenCalledWith(hash, password);
  });
});
