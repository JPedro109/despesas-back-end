import { Module } from '@nestjs/common';
import { emailServiceQueue } from './queues';

@Module({
  imports: [emailServiceQueue],
  exports: [emailServiceQueue],
})
export class QueueModule {}
