import { initApp, before, after, getHttpServer } from '../../../__mocks__';
import * as request from 'supertest';

const makeBodySendUserPasswordRecoverylink = (email: unknown) => {
  return {
    email,
  };
};

describe('/api/users/send-password-recovery-link - PATCH', () => {
  beforeEach(async () => {
    const { module } = await initApp();
    await before(module);
  });

  afterEach(async () => {
    const { module, app } = await initApp();
    await after(app, module);
  });

  test('Should not send user password recovery link, because email is empty', async () => {
    const body = makeBodySendUserPasswordRecoverylink('');

    const response = await request(await getHttpServer())
      .patch('/api/users/send-password-recovery-link')
      .send(body);

    expect(response.statusCode).toBe(400);
    expect(response.body.error).toBe('Bad Request');
  });

  test('Should not send user password recovery link, because email is with type error', async () => {
    const body = makeBodySendUserPasswordRecoverylink(100);

    const response = await request(await getHttpServer())
      .patch('/api/users/send-password-recovery-link')
      .send(body);

    expect(response.statusCode).toBe(400);
    expect(response.body.error).toBe('Bad Request');
  });

  test('Should not send user password recovery link, because email is not register', async () => {
    const body = makeBodySendUserPasswordRecoverylink(
      'email_is_not_register@test.com',
    );

    const response = await request(await getHttpServer())
      .patch('/api/users/send-password-recovery-link')
      .send(body);

    expect(response.statusCode).toBe(404);
    expect(response.body.error).toBe('NotFoundError');
  });

  test('Should send user password recovery link', async () => {
    const body = makeBodySendUserPasswordRecoverylink(
      'email_verified@test.com',
    );

    const response = await request(await getHttpServer())
      .patch('/api/users/send-password-recovery-link')
      .send(body);

    expect(response.statusCode).toBe(200);
    expect(response.body).toBe(body.email);
  });
});
