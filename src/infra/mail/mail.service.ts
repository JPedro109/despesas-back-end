import { Injectable } from '@nestjs/common';
import {
  EMAIL_PROVIDER_EMAIL,
  HOST_PROVIDER_EMAIL,
  PASSWORD_PROVIDER_EMAIL,
  PORT_PROVIDER_EMAIL,
} from '@/shared';
import { AbstractMailService } from '@/core/ports';

import * as path from 'path';

import { SentMessageInfo, Transporter, createTransport } from 'nodemailer';
import * as hbs from 'nodemailer-express-handlebars';

@Injectable()
export class MailService implements AbstractMailService {
  private readonly mail: Transporter<SentMessageInfo>;
  private readonly email: string = EMAIL_PROVIDER_EMAIL;
  private readonly password: string = PASSWORD_PROVIDER_EMAIL;
  private readonly host: string = HOST_PROVIDER_EMAIL;
  private readonly port: number = PORT_PROVIDER_EMAIL;
  private readonly ssl = false;
  private readonly emailBodiesPath = './src/infra/mail/bodies';

  constructor() {
    this.mail = createTransport({
      host: this.host,
      port: this.port,
      secure: this.ssl,
      auth: { user: this.email, pass: this.password },
    }).use(
      'compile',
      hbs({
        viewEngine: {
          defaultLayout: null,
          partialsDir: path.resolve(this.emailBodiesPath),
        },
        viewPath: path.resolve(this.emailBodiesPath),
        extName: '.html',
      }),
    );
  }

  async sendMail(
    to: string,
    subject: string,
    html: string,
    context?: object,
  ): Promise<void> {
    const email = {
      from: this.email,
      to,
      subject,
      template: html,
      context,
    };

    await this.mail.sendMail(email);
  }
}
