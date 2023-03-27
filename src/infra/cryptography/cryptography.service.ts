import { Injectable } from '@nestjs/common';
import { AbstractCryptographyService } from '@/core/ports';

import * as bcryptjs from 'bcryptjs';

@Injectable()
export class CryptographyService implements AbstractCryptographyService {
  private readonly bcryptjs = bcryptjs;
  private readonly salt: number = 12;

  async hash(value: string): Promise<string> {
    return this.bcryptjs.hashSync(value, this.salt);
  }

  async compareHash(hash: string, valueToBeCompared: string): Promise<boolean> {
    return this.bcryptjs.compareSync(valueToBeCompared, hash);
  }
}
