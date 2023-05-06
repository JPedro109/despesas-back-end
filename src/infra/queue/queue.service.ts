import { Injectable } from '@nestjs/common';
import { AbstractQueue } from '@/core/ports';
import { QueueHelper } from './helper';

@Injectable()
export class QueueService implements AbstractQueue {
  async sendMessage(queue: string, object: object): Promise<void> {
    QueueHelper.channel.sendToQueue(queue, Buffer.from(JSON.stringify(object)));
  }
}
