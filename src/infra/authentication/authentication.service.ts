import { Injectable } from '@nestjs/common';
import {
  AbstractAuthenticationService,
  JsonWebTokenInvalidError,
  JsonWebTokenType,
} from '@/core/ports';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthenticationService implements AbstractAuthenticationService {
  constructor(private jwtService: JwtService) {}

  async createJsonWebToken(
    payload: object,
    expiryTimeInSeconds: number,
  ): Promise<string> {
    return await this.jwtService.signAsync(payload, {
      expiresIn: expiryTimeInSeconds,
    });
  }

  async verifyJsonWebToken(
    token: string,
  ): Promise<JsonWebTokenType | JsonWebTokenInvalidError> {
    try {
      return (await this.jwtService.verifyAsync(token)) as JsonWebTokenType;
    } catch {
      return new JsonWebTokenInvalidError();
    }
  }
}
