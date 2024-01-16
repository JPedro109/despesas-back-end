import { Module } from '@nestjs/common';
import { AbstractLogService } from '@/core/ports';
import { LogBashAdapter, LogNoSQLAdapter } from './adapters';
import { LogService } from './log.service';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule],
  providers: [
    LogBashAdapter,
    LogNoSQLAdapter,
    {
      provide: AbstractLogService,
      useClass: LogService,
    },
  ],
  exports: [
    {
      provide: AbstractLogService,
      useClass: LogService,
    },
  ],
})
export class LogModule {}
