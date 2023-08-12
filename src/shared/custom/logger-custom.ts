import { ConsoleLogger } from '@nestjs/common';
import { AbstractLogRepository } from '@/core/ports';

export class LoggerCustom extends ConsoleLogger {
  constructor(
    private readonly consoleLogger: ConsoleLogger,
    private readonly logRepository: AbstractLogRepository,
  ) {
    super();
  }

  error(message: unknown, stack?: unknown, context?: unknown): void {
    this.consoleLogger.error(message, stack, context);
    this.logRepository.createLog(
      message.toString(),
      stack.toString(),
      context.toString(),
    );
  }
}
