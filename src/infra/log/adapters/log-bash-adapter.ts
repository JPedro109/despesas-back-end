import { ConsoleLogger, Injectable } from '@nestjs/common';
import { AbstractLogService } from '@/core/ports';

@Injectable()
export class LogBashAdapter implements AbstractLogService {
  private readonly consoleLogger: ConsoleLogger = new ConsoleLogger();

  trace(title: string, message: string, trace: string): boolean {
    this.consoleLogger.log(message, `${title} | ${trace}`);
    return true;
  }

  log(title: string, message: string): boolean {
    this.consoleLogger.log(message, `${title}`);
    return true;
  }

  warn(title: string, message: string): boolean {
    this.consoleLogger.warn(message, `${title}`);
    return true;
  }

  error(title: string, message: string): boolean {
    this.consoleLogger.error(message, `${title}`);
    return true;
  }
}
