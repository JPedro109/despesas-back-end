import { Module } from '@nestjs/common';
import { AbstractGenerationService } from '@/core/ports';
import { GenerationService } from './generation.service';

@Module({
  providers: [
    {
      provide: AbstractGenerationService,
      useClass: GenerationService,
    },
  ],
  exports: [
    {
      provide: AbstractGenerationService,
      useClass: GenerationService,
    },
  ],
})
export class GenerationModule {}
