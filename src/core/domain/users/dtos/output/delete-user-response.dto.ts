import { InvalidParamError, NotFoundError } from '@/core/errors';

export type DeleteUserResponseDTO = string | InvalidParamError | NotFoundError;
