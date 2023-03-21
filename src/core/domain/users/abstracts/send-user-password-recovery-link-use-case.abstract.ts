import {
  SendUserPasswordRecoveryLinkDTO,
  SendUserPasswordRecoveryLinkResponseDTO,
} from '../dtos';

export abstract class AbstractSendUserPasswordRecoveryLinkUseCase {
  abstract execute({
    email,
  }: SendUserPasswordRecoveryLinkDTO): Promise<SendUserPasswordRecoveryLinkResponseDTO>;
}
