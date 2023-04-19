import { Test, TestingModule } from '@nestjs/testing';
import { MongooseModule } from '@nestjs/mongoose';
import { DATABASE_NOSQL_URL } from '@/shared';
import {
  LogRepository,
  LogExpense,
  LogSchema,
} from '@/infra/database/mongoose';

describe('Infra - LogRepository', () => {
  let app: TestingModule;
  let sut: LogRepository;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      imports: [
        MongooseModule.forRoot(DATABASE_NOSQL_URL),
        MongooseModule.forFeature([
          { name: LogExpense.name, schema: LogSchema },
        ]),
      ],
      providers: [LogRepository],
    }).compile();

    sut = app.get<LogRepository>(LogRepository);
  });

  test('Should create logs and delete all | createLog', async () => {
    const message = 'message';
    const stack = 'stack';
    const name = 'name';

    const log = await sut.createLog(message, stack, name);

    expect(log.message).toBe(message);
    expect(log.stack).toBe(stack);
    expect(log.name).toBe(name);

    await sut.deleteAllLogs();
  });
});
