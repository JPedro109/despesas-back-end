import { Module } from '@nestjs/common';
import { AbstractQueue } from '@/core/ports';
import { QueueService } from './queue.service';

@Module({
  providers: [
    {
      provide: AbstractQueue,
      useClass: QueueService,
    },
  ],
  exports: [
    {
      provide: AbstractQueue,
      useClass: QueueService,
    },
  ],
})
export class QueueModule {}
