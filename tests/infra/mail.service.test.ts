import { Test, TestingModule } from '@nestjs/testing';
import { QueueModule } from '@/infra';
import { MailService } from '@/infra/mail/mail.service';

describe('Infra - MailService', () => {
  let sut: MailService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [QueueModule],
      providers: [MailService],
    }).compile();

    sut = app.get<MailService>(MailService);
  });

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
