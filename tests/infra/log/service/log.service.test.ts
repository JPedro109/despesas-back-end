import { Test, TestingModule } from '@nestjs/testing';
import { DatabaseModule } from '@/infra';
import { LogBashAdapter, LogNoSQLAdapter } from '@/infra/log/adapters';
import { LogService } from '@/infra/log/log.service';

describe('External - LogFacade', () => {
  let sut: LogService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [DatabaseModule],
      providers: [LogNoSQLAdapter, LogBashAdapter, LogService],
    }).compile();

    sut = app.get<LogService>(LogService);
  });

  test('Should return true | trace', () => {
    const title = 'TEST';
    const message = '{"name":"test"}';
    const trace = '0000000000';
    jest.spyOn(sut, 'trace');

    const result = sut.trace(title, message, trace);

    expect(result).toBeTruthy();
    expect(sut.trace).toHaveBeenCalled();
    expect(sut.trace).toHaveBeenCalledWith(title, message, trace);
  });

  test('Should return true | log', () => {
    const title = 'TEST';
    const message = '{"name":"test"}';
    jest.spyOn(sut, 'log');

    const result = sut.log(title, message);

    expect(result).toBeTruthy();
    expect(sut.log).toHaveBeenCalled();
    expect(sut.log).toHaveBeenCalledWith(title, message);
  });

  test('Should return true | warn', () => {
    const title = 'TEST';
    const message = '{"name":"test"}';
    jest.spyOn(sut, 'warn');

    const result = sut.warn(title, message);

    expect(result).toBeTruthy();
    expect(sut.warn).toHaveBeenCalled();
    expect(sut.warn).toHaveBeenCalledWith(title, message);
  });

  test('Should return true | error', () => {
    const title = 'TEST';
    const message = '{"name":"test"}';
    jest.spyOn(sut, 'error');

    const result = sut.error(title, message);

    expect(result).toBeTruthy();
    expect(sut.error).toHaveBeenCalled();
    expect(sut.error).toHaveBeenCalledWith(title, message);
  });
});
