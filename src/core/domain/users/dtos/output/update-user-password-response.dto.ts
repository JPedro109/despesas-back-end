import { InvalidPasswordError } from '@/core/domain/users/entities';
import { InvalidParamError, NotFoundError } from '@/core/errors';

export type UpdateUserPasswordResponseDTO =
  | string
  | InvalidPasswordError
  | InvalidParamError
  | NotFoundError;
