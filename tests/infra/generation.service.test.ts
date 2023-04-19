import { Test, TestingModule } from '@nestjs/testing';
import { GenerationService } from '@/infra/generation/generation.service';

describe('Infra - GenerationService', () => {
  let sut: GenerationService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [GenerationService],
    }).compile();

    sut = app.get<GenerationService>(GenerationService);
  });

  test('Should return the code | code', () => {
    jest.spyOn(sut, 'code');

    const result = sut.code();

    expect(typeof result).toBe('string');
    expect(result.length).toBe(6);
    expect(sut.code).toHaveBeenCalled();
  });

  test('Should return the code expiration date | codeExpirationDate', () => {
    const timeInMinutes = 10;
    jest.spyOn(sut, 'codeExpirationDate');

    const result = sut.codeExpirationDate(timeInMinutes);

    expect(typeof result).toBe('number');
    expect(sut.codeExpirationDate).toHaveBeenCalled();
    expect(sut.codeExpirationDate).toHaveBeenCalledWith(timeInMinutes);
  });
});
