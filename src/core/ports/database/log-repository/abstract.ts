import { LogModel } from './model';

export abstract class AbstractLogRepository {
  abstract createLog(
    level: string,
    title: string,
    message: string,
    trace?: string,
  ): Promise<LogModel>;
  abstract deleteAllLogs(): Promise<void>;
}
