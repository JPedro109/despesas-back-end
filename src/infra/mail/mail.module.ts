import { Module } from '@nestjs/common';
import { QueueModule } from '@/infra';
import { AbstractMailService } from '@/core/ports';
import { MailService } from './mail.service';

@Module({
  imports: [QueueModule],
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
