import { Model, Document, Types } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { AbstractLogRepository, LogModel } from '@/core/ports';
import { LogExpense } from '../models';

@Injectable()
export class LogRepository implements AbstractLogRepository {
  constructor(
    @InjectModel(LogExpense.name)
    private readonly model: Model<LogExpense>,
  ) {}

  private toMapperLogModel(
    // eslint-disable-next-line @typescript-eslint/ban-types
    log: Document<unknown, {}, LogExpense> &
      Omit<
        LogExpense & {
          _id: Types.ObjectId;
        },
        never
      >,
  ) {
    return new LogModel(log._id.toString(), log.message, log.stack, log.name);
  }

  async createLog(
    message: string,
    stack: string,
    name: string,
  ): Promise<LogModel> {
    const log = await this.model.create({
      message,
      stack,
      name,
    });

    return this.toMapperLogModel(log);
  }

  async deleteAllLogs(): Promise<void> {
    await this.model.deleteMany({});
  }
}
