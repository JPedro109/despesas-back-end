import { JsonWebTokenInvalidError } from './error';
import { JsonWebTokenType } from './type';

export abstract class AbstractAuthenticationService {
  abstract createJsonWebToken(
    payload: object,
    expiryTimeInSeconds: number,
  ): Promise<string>;
  abstract verifyJsonWebToken(
    token: string,
  ): Promise<JsonWebTokenType | JsonWebTokenInvalidError>;
}
