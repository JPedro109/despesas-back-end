import {
  SendUserEmailUpdateLinkDTO,
  SendUserEmailUpdateLinkResponseDTO,
} from '../dtos';

export abstract class AbstractSendUserEmailUpdateLinkUseCase {
  abstract execute({
    id,
    email,
  }: SendUserEmailUpdateLinkDTO): Promise<SendUserEmailUpdateLinkResponseDTO>;
}
