import { AbstractLogService, AbstractLogRepository } from '@/core/ports';
import { Injectable } from '@nestjs/common';
import { LogBashAdapter } from './log-bash-adapter';

@Injectable()
export class LogNoSQLAdapter implements AbstractLogService {
  constructor(
    private readonly logRepository: AbstractLogRepository,
    private readonly logBashAdapter: LogBashAdapter,
  ) {}

  trace(title: string, message: string, trace: string): boolean {
    this.logRepository.createLog('TRACE', title, message, trace).catch((e) => {
      this.logBashAdapter.error('LogNoSQLAdapter', JSON.stringify(e));
    });
    return true;
  }

  log(title: string, message: string): boolean {
    this.logRepository.createLog('LOG', title, message).catch((e) => {
      this.logBashAdapter.error('LogNoSQLAdapter', JSON.stringify(e));
    });
    return true;
  }

  warn(title: string, message: string): boolean {
    this.logRepository.createLog('WARN', title, message).catch((e) => {
      this.logBashAdapter.error('LogNoSQLAdapter', JSON.stringify(e));
    });
    return true;
  }

  error(title: string, message: string): boolean {
    this.logRepository.createLog('ERROR', title, message).catch((e) => {
      this.logBashAdapter.error('LogNoSQLAdapter', JSON.stringify(e));
    });
    return true;
  }
}
