import { Test, TestingModule } from '@nestjs/testing';
import { JwtModule } from '@nestjs/jwt';
import { JsonWebTokenInvalidError } from '@/core/ports';
import { AuthenticationService } from '@/infra/authentication/authentication.service';

describe('Infra - AuthenticationService', () => {
  let sut: AuthenticationService;
  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [
        JwtModule.register({
          global: true,
          secret: 'secret',
        }),
      ],
      providers: [AuthenticationService],
    }).compile();

    sut = app.get<AuthenticationService>(AuthenticationService);
  });

  test('Should create the token jwt | createJsonWebToken', async () => {
    const payload = {
      id: 1,
    };
    const expiryTimeInSeconds = 10;

    jest.spyOn(sut, 'createJsonWebToken');

    const result = await sut.createJsonWebToken(payload, expiryTimeInSeconds);

    expect(typeof result).toBe('string');
    expect(sut.createJsonWebToken).toHaveBeenCalled();
    expect(sut.createJsonWebToken).toHaveBeenCalledWith(
      payload,
      expiryTimeInSeconds,
    );
  });

  test('Should return error | verifyJsonWebToken', async () => {
    const invalidToken = 'invalid_token';

    jest.spyOn(sut, 'verifyJsonWebToken');

    const result = await sut.verifyJsonWebToken(invalidToken);

    expect(result).toBeInstanceOf(JsonWebTokenInvalidError);
    expect(sut.verifyJsonWebToken).toHaveBeenCalled();
    expect(sut.verifyJsonWebToken).toHaveBeenCalledWith(invalidToken);
  });

  test('Should verify the token jwt | verifyJsonWebToken', async () => {
    const payload = { id: 1 };
    const token = await sut.createJsonWebToken(payload, 1);
    jest.spyOn(sut, 'verifyJsonWebToken');

    const result = await sut.verifyJsonWebToken(token);

    expect(result).not.toBeInstanceOf(JsonWebTokenInvalidError);
    expect(sut.verifyJsonWebToken).toHaveBeenCalled();
    expect(sut.verifyJsonWebToken).toHaveBeenCalledWith(token);
  });
});
