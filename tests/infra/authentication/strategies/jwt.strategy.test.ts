import { Test, TestingModule } from '@nestjs/testing';
import { JwtStrategy } from '@/infra/authentication/strategies';

describe('Infra - JwtStrategy', () => {
  let service: JwtStrategy;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [JwtStrategy],
    }).compile();

    service = module.get<JwtStrategy>(JwtStrategy);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
