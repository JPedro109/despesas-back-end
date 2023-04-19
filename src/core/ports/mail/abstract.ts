export abstract class AbstractMailService {
  abstract sendMail(
    to: string,
    subject: string,
    html: string,
    context?: object,
  ): Promise<void>;
}
