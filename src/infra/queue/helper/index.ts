import { QUEUE_HOST } from '@/shared';
import { Channel, Connection, connect } from 'amqplib';

export class QueueHelper {
  private static connection: Connection | null = null;
  static channel: Channel;

  static async connect(): Promise<void> {
    if (!QueueHelper.connection) {
      QueueHelper.connection = await connect(QUEUE_HOST);
      QueueHelper.channel = await QueueHelper.connection.createChannel();
    }
  }

  static async disconnect(): Promise<void> {
    await QueueHelper.connection.close();
    QueueHelper.connection = null;
  }
}
