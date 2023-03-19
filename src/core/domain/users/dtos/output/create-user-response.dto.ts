import {
  InvalidEmailError,
  InvalidPasswordError,
} from '@/core/domain/users/entities';
import { InvalidParamError } from '@/core/errors';

export type CreateUserResponseDTO =
  | string
  | InvalidEmailError
  | InvalidPasswordError
  | InvalidParamError;
