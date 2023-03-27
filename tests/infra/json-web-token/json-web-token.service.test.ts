import { Test, TestingModule } from '@nestjs/testing';
import { JwtModule } from '@nestjs/jwt';
import { JsonWebTokenInvalidError } from '@/core/ports';
import { JsonWebTokenService } from '@/infra/json-web-token/json-web-token.service';

describe('Infra - JsonWebTokenService', () => {
  let sut: JsonWebTokenService;
  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [
        JwtModule.register({
          global: true,
          secret: 'secret',
        }),
      ],
      providers: [JsonWebTokenService],
    }).compile();

    sut = app.get<JsonWebTokenService>(JsonWebTokenService);
  });

  test('Should create the token jwt | createToken', async () => {
    const payload = {
      id: 1,
    };
    const expiryTimeInSeconds = 10;

    jest.spyOn(sut, 'createToken');

    const result = await sut.createToken(payload, expiryTimeInSeconds);

    expect(typeof result).toBe('string');
    expect(sut.createToken).toHaveBeenCalled();
    expect(sut.createToken).toHaveBeenCalledWith(payload, expiryTimeInSeconds);
  });

  test('Should return error | verifyToken', async () => {
    const invalidToken = 'invalid_token';

    jest.spyOn(sut, 'verifyToken');

    const result = await sut.verifyToken(invalidToken);

    expect(result).toBeInstanceOf(JsonWebTokenInvalidError);
    expect(sut.verifyToken).toHaveBeenCalled();
    expect(sut.verifyToken).toHaveBeenCalledWith(invalidToken);
  });

  test('Should verify the token jwt | verifyToken', async () => {
    const payload = { id: 1 };
    const token = await sut.createToken(payload, 1);
    jest.spyOn(sut, 'verifyToken');

    const result = await sut.verifyToken(token);

    expect(result).not.toBeInstanceOf(JsonWebTokenInvalidError);
    expect(sut.verifyToken).toHaveBeenCalled();
    expect(sut.verifyToken).toHaveBeenCalledWith(token);
  });
});
