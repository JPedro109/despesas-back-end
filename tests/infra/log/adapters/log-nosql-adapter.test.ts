import { Test, TestingModule } from '@nestjs/testing';
import { DatabaseModule } from '@/infra';
import { LogBashAdapter, LogNoSQLAdapter } from '@/infra/log/adapters';
import { AbstractLogRepository } from '@/core/ports';

describe('Infra - LogModule - LogNoSQLAdapter', () => {
  let sut: LogNoSQLAdapter;
  let logRepository: AbstractLogRepository;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [DatabaseModule],
      providers: [LogNoSQLAdapter, LogBashAdapter],
    }).compile();

    sut = app.get<LogNoSQLAdapter>(LogNoSQLAdapter);
    logRepository = app.get<AbstractLogRepository>(AbstractLogRepository);
  });

  test('Should return true but the insertation will fail | trace', () => {
    const title = 'TEST';
    const message = '{"name":"test"}';
    const trace = '0000000000';
    jest.spyOn(sut, 'trace');
    jest
      .spyOn(logRepository, 'createLog')
      .mockReturnValueOnce(Promise.reject(new Error('TEST')));

    const result = sut.trace(title, message, trace);

    expect(result).toBeTruthy();
    expect(sut.trace).toHaveBeenCalled();
    expect(sut.trace).toHaveBeenCalledWith(title, message, trace);
  });

  test('Should return true | trace', () => {
    const title = 'TEST';
    const message = '{"name":"test"}';
    const trace = '0000000000';
    jest.spyOn(sut, 'trace');
    jest
      .spyOn(logRepository, 'createLog')
      .mockReturnValueOnce(Promise.reject(new Error('TEST')));

    const result = sut.trace(title, message, trace);

    expect(result).toBeTruthy();
    expect(sut.trace).toHaveBeenCalled();
    expect(sut.trace).toHaveBeenCalledWith(title, message, trace);
  });

  test('Should return true but the insertation will fail | log', () => {
    const title = 'TEST';
    const message = '{"name":"test"}';
    jest.spyOn(sut, 'log');
    jest
      .spyOn(logRepository, 'createLog')
      .mockReturnValueOnce(Promise.reject(new Error('TEST')));

    const result = sut.log(title, message);

    expect(result).toBeTruthy();
    expect(sut.log).toHaveBeenCalled();
    expect(sut.log).toHaveBeenCalledWith(title, message);
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

  test('Should return true but the insertation will fail | warn', () => {
    const title = 'TEST';
    const message = '{"name":"test"}';
    jest.spyOn(sut, 'warn');
    jest
      .spyOn(logRepository, 'createLog')
      .mockReturnValueOnce(Promise.reject(new Error('TEST')));

    const result = sut.warn(title, message);

    expect(result).toBeTruthy();
    expect(sut.warn).toHaveBeenCalled();
    expect(sut.warn).toHaveBeenCalledWith(title, message);
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

  test('Should return true but the insertation will fail | error', () => {
    const title = 'TEST';
    const message = '{"name":"test"}';
    jest.spyOn(sut, 'error');
    jest
      .spyOn(logRepository, 'createLog')
      .mockReturnValueOnce(Promise.reject(new Error('TEST')));

    const result = sut.error(title, message);

    expect(result).toBeTruthy();
    expect(sut.error).toHaveBeenCalled();
    expect(sut.error).toHaveBeenCalledWith(title, message);
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
