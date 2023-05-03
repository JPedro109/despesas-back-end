import { Test, TestingModule } from '@nestjs/testing';
import { QueueService } from '@/infra/queue/queue.service';
import { QueueHelper } from '@/infra/queue/helper';

describe('Infra - QueueService', () => {
  let sut: QueueService;

  beforeAll(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [QueueService],
    }).compile();

    sut = app.get<QueueService>(QueueService);

    await QueueHelper.connect();
  });

  afterAll(async () => await QueueHelper.disconnect());

  test('Should send message | sendMessage', async () => {
    jest.spyOn(sut, 'sendMessage');
    await sut.sendMessage('queue', { name: 'João' });

    expect(sut.sendMessage).toHaveBeenCalled();
    expect(sut.sendMessage).toHaveBeenCalledWith('queue', { name: 'João' });
  });
});
