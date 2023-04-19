import { Module } from '@nestjs/common';
import { AbstractMailService } from '@/core/ports';
import { MailService } from './mail.service';

@Module({
  providers: [
    {
      provide: AbstractMailService,
      useClass: MailService,
    },
  ],
  exports: [
    {
      provide: AbstractMailService,
      useClass: MailService,
    },
  ],
})
export class MailModule {}
