import { Injectable } from '@nestjs/common';
import { AbstractGenerationService } from '@/core/ports';

import { randomBytes } from 'crypto';

@Injectable()
export class GenerationService implements AbstractGenerationService {
  code(): string {
    return randomBytes(3).toString('hex').toUpperCase();
  }

  codeExpirationDate(timeInMinutes: number): number {
    return new Date().setMinutes(new Date().getMinutes() + timeInMinutes);
  }
}
