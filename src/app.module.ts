import { Module } from '@nestjs/common';
import { HttpModule } from '@/infra';

@Module({
  imports: [HttpModule],
})
export class AppModule {}
