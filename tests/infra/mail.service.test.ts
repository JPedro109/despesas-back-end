import { Test, TestingModule } from '@nestjs/testing';
import { MailService } from '@/infra/mail/mail.service';
import { QueueService } from '@/infra/queue/queue.service';
import { QueueHelper } from '@/infra/queue/helper';
import { AbstractQueue } from '@/core/ports';

describe('Infra - MailService', () => {
  let sut: MailService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [
        MailService,
        {
          provide: AbstractQueue,
          useClass: QueueService,
        },
      ],
    }).compile();

    sut = app.get<MailService>(MailService);
    await QueueHelper.connect();
  });

  afterAll(async () => await QueueHelper.disconnect());

  test('Should send email | sendEmail', async () => {
    const email = 'email@test.com';
    const subject = 'Test';
    const html = 'create-user.body';
    jest.spyOn(sut, 'sendMail');

    await sut.sendMail(email, subject, html);

    expect(sut.sendMail).toHaveBeenCalled();
    expect(sut.sendMail).toHaveBeenCalledWith(email, subject, html);
  });
});
