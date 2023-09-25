import { ClientsModule, Transport } from '@nestjs/microservices';
import { QUEUE_HOST, QUEUE_NAME } from '@/shared';

export const emailServiceQueue = ClientsModule.register([
  {
    name: 'MAIL_SERVICE',
    transport: Transport.RMQ,
    options: {
      urls: [QUEUE_HOST],
      queue: QUEUE_NAME,
      queueOptions: {
        durable: true,
      },
    },
  },
]);
