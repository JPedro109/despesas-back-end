import { initApp, before, after, getHttpServer } from '../../../__mocks__';
import * as request from 'supertest';

const makeBodySendUserEmailUpdateLink = (email: unknown) => {
  return {
    email,
  };
};

describe('/api/users/send-email-update-link - PATCH', () => {
  beforeEach(async () => {
    const { module } = await initApp();
    await before(module);
  });

  afterEach(async () => {
    const { module, app } = await initApp();
    await after(app, module);
  });

  test('Should not send user email update link, because email is empty', async () => {
    const body = makeBodySendUserEmailUpdateLink('');

    const token = (
      await request(await getHttpServer())
        .post('/api/users/login')
        .send({
          email: 'email_verified@test.com',
          password: 'Password1234',
        })
    ).body;

    const response = await request(await getHttpServer())
      .patch('/api/users/send-email-update-link')
      .set('Authorization', `Bearer ${token}`)
      .send(body);

    expect(response.statusCode).toBe(400);
    expect(response.body.error).toBe('Bad Request');
  });

  test('Should not send user email update link, because email is with type error', async () => {
    const body = makeBodySendUserEmailUpdateLink(100);

    const token = (
      await request(await getHttpServer())
        .post('/api/users/login')
        .send({
          email: 'email_verified@test.com',
          password: 'Password1234',
        })
    ).body;

    const response = await request(await getHttpServer())
      .patch('/api/users/send-email-update-link')
      .set('Authorization', `Bearer ${token}`)
      .send(body);

    expect(response.statusCode).toBe(400);
    expect(response.body.error).toBe('Bad Request');
  });

  test('Should not send user email update link, because email is invalid', async () => {
    const body = makeBodySendUserEmailUpdateLink('email.com');

    const token = (
      await request(await getHttpServer())
        .post('/api/users/login')
        .send({
          email: 'email_verified@test.com',
          password: 'Password1234',
        })
    ).body;

    const response = await request(await getHttpServer())
      .patch('/api/users/send-email-update-link')
      .set('Authorization', `Bearer ${token}`)
      .send(body);

    expect(response.statusCode).toBe(400);
    expect(response.body.error).toBe('InvalidEmailError');
  });

  test('Should not send user email update link, because email already is register', async () => {
    const body = makeBodySendUserEmailUpdateLink('email_verified@test.com');

    const token = (
      await request(await getHttpServer())
        .post('/api/users/login')
        .send({
          email: 'email_verified@test.com',
          password: 'Password1234',
        })
    ).body;

    const response = await request(await getHttpServer())
      .patch('/api/users/send-email-update-link')
      .set('Authorization', `Bearer ${token}`)
      .send(body);

    expect(response.statusCode).toBe(400);
    expect(response.body.error).toBe('InvalidParamError');
  });

  test('Should send user email update link', async () => {
    const body = makeBodySendUserEmailUpdateLink('email@test.com');

    const token = (
      await request(await getHttpServer())
        .post('/api/users/login')
        .send({
          email: 'email_verified@test.com',
          password: 'Password1234',
        })
    ).body;

    const response = await request(await getHttpServer())
      .patch('/api/users/send-email-update-link')
      .set('Authorization', `Bearer ${token}`)
      .send(body);

    expect(response.statusCode).toBe(200);
    expect(response.body).toBe(body.email);
  });
});
