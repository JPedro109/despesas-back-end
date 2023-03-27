import { Injectable } from '@nestjs/common';
import {
  AbstractJsonWebTokenService,
  JsonWebTokenInvalidError,
  JsonWebTokenType,
} from '@/core/ports';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JsonWebTokenService implements AbstractJsonWebTokenService {
  constructor(private jwtService: JwtService) {}

  async createToken(
    payload: object,
    expiryTimeInSeconds: number,
  ): Promise<string> {
    return await this.jwtService.signAsync(payload, {
      expiresIn: expiryTimeInSeconds,
    });
  }

  async verifyToken(
    token: string,
  ): Promise<JsonWebTokenType | JsonWebTokenInvalidError> {
    try {
      return (await this.jwtService.verifyAsync(token)) as JsonWebTokenType;
    } catch {
      return new JsonWebTokenInvalidError();
    }
  }
}
