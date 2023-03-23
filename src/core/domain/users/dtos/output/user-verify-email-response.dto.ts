import { InvalidParamError, NotFoundError } from '@/core/errors';

export type UserVerifyEmailResponseDTO =
  | string
  | NotFoundError
  | InvalidParamError;
