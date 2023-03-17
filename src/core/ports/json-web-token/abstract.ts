import { JsonWebTokenInvalidError } from './error';
import { JsonWebTokenType } from './type';

export abstract class AbstractJsonWebTokenService {
  abstract createToken(
    payload: object,
    expiryTimeInSeconds: number,
  ): Promise<string>;
  abstract verifyToken(
    token: string,
  ): Promise<JsonWebTokenType | JsonWebTokenInvalidError>;
}
