import { Module } from '@nestjs/common';
import { AbstractCryptographyService } from '@/core/ports';
import { CryptographyService } from './cryptography.service';

@Module({
  providers: [
    {
      provide: AbstractCryptographyService,
      useClass: CryptographyService,
    },
  ],
  exports: [
    {
      provide: AbstractCryptographyService,
      useClass: CryptographyService,
    },
  ],
})
export class CryptographyModule {}
