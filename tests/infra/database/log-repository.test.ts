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
    const level = 'INFO';
    const title = 'title';
    const message = 'message';

    const log = await sut.createLog(level, title, message);

    expect(log.level).toBe(level);
    expect(log.title).toBe(title);
    expect(log.message).toBe(message);

    await sut.deleteAllLogs();
  });
});
