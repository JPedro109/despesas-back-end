import { LogModel } from './model';

export abstract class AbstractLogRepository {
  abstract createLog(
    message: string,
    stack: string,
    name: string,
  ): Promise<LogModel>;
  abstract deleteAllLogs(): Promise<void>;
}
