import { Injectable } from '@nestjs/common';
import { QUEUE_NAME } from '@/shared';
import { AbstractMailService, AbstractQueue } from '@/core/ports';

@Injectable()
export class MailService implements AbstractMailService {
  constructor(private readonly queue: AbstractQueue) {}

  async sendMail(
    to: string,
    subject: string,
    html: string,
    context?: object,
  ): Promise<void> {
    const email = {
      to,
      subject,
      template: html,
      context,
    };

    await this.queue.sendMessage(QUEUE_NAME, email);
  }
}
