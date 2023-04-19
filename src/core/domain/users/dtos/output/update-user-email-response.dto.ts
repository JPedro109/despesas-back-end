import { InvalidParamError, NotFoundError } from '@/core/errors';

export type UpdateUserEmailResponseDTO =
  | string
  | NotFoundError
  | InvalidParamError;
