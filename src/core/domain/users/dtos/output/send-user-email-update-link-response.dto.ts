import { InvalidEmailError } from '@/core/domain/users/entities';
import { InvalidParamError, NotFoundError } from '@/core/errors';

export type SendUserEmailUpdateLinkResponseDTO =
  | string
  | InvalidEmailError
  | NotFoundError
  | InvalidParamError;
