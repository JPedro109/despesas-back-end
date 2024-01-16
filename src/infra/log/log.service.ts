import { Injectable } from '@nestjs/common';
import { AbstractLogService } from '@/core/ports';
import { LogBashAdapter, LogNoSQLAdapter } from './adapters';

@Injectable()
export class LogService implements AbstractLogService {
  constructor(
    private readonly logBashAdapter: LogBashAdapter,
    private readonly logNoSQLAdapter: LogNoSQLAdapter,
  ) {}

  private executeLogAdapters(
    type: 'trace' | 'info' | 'warning' | 'error',
    title: string,
    message: string,
    trace?: string,
  ) {
    switch (type) {
      case 'trace':
        this.logBashAdapter.trace(title, message, trace);
        this.logNoSQLAdapter.trace(title, message, trace);
        break;
      case 'info':
        this.logBashAdapter.log(title, message);
        this.logNoSQLAdapter.log(title, message);
        break;
      case 'warning':
        this.logBashAdapter.warn(title, message);
        this.logNoSQLAdapter.warn(title, message);
        break;
      case 'error':
        this.logBashAdapter.error(title, message);
        this.logNoSQLAdapter.error(title, message);
        break;
    }
  }

  trace(title: string, message: string, trace: string): boolean {
    this.executeLogAdapters('trace', title, message, trace);
    return true;
  }

  log(title: string, message: string): boolean {
    this.executeLogAdapters('info', title, message);
    return true;
  }

  warn(title: string, message: string): boolean {
    this.executeLogAdapters('warning', title, message);
    return true;
  }

  error(title: string, message: string): boolean {
    this.executeLogAdapters('error', title, message);
    return true;
  }
}
