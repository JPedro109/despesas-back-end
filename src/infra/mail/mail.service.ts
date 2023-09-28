import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { AbstractMailService } from '@/core/ports';

@Injectable()
export class MailService implements AbstractMailService {
  constructor(@Inject('MAIL_SERVICE') private client: ClientProxy) {}

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
      service: 'DESPESAS',
    };

    this.client.emit('send_email', email);
  }
}
