import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class DatabaseService extends PrismaClient {
  async connect() {
    await this.$connect();
  }

  async disconnect() {
    await this.$disconnect();
  }
}
