import { initApp, before, after, getHttpServer } from '../../../__mocks__';
import * as request from 'supertest';

const makeBodyUpdateUserEmail = (email: string, code: string) => {
  return {
    email,
    code,
  };
};

describe('/api/users/email - PATCH', () => {
  beforeEach(async () => {
    const { module } = await initApp();
    await before(module);
  });

  afterEach(async () => {
    const { module, app } = await initApp();
    await after(app, module);
  });

  test('Should not update user email, because email is empty', async () => {
    const body = makeBodyUpdateUserEmail('', 'token');

    const token = (
      await request(await getHttpServer())
        .post('/api/users/login')
        .send({
          email: 'email_verified@test.com',
          password: 'Password1234',
        })
    ).body;

    const response = await request(await getHttpServer())
      .patch(`/api/users/email?email=${body.email}&code=${body.code}`)
      .set('Authorization', `Bearer ${token}`);

    expect(response.statusCode).toBe(400);
    expect(response.body.error).toBe('Bad Request');
  });

  test('Should not update user email, because code is empty', async () => {
    const body = makeBodyUpdateUserEmail('email@test.com', '');

    const token = (
      await request(await getHttpServer())
        .post('/api/users/login')
        .send({
          email: 'email_verified@test.com',
          password: 'Password1234',
        })
    ).body;

    const response = await request(await getHttpServer())
      .patch(`/api/users/email?email=${body.email}&code=${body.code}`)
      .set('Authorization', `Bearer ${token}`);

    expect(response.statusCode).toBe(400);
    expect(response.body.error).toBe('Bad Request');
  });

  test('Should not update user email, because code is invalid', async () => {
    const body = makeBodyUpdateUserEmail(
      'email_verified@test.com',
      'invalid_code',
    );

    const token = (
      await request(await getHttpServer())
        .post('/api/users/login')
        .send({
          email: 'email_verified@test.com',
          password: 'Password1234',
        })
    ).body;

    const response = await request(await getHttpServer())
      .patch(`/api/users/email?email=${body.email}&code=${body.code}`)
      .set('Authorization', `Bearer ${token}`);

    expect(response.statusCode).toBe(400);
    expect(response.body.error).toBe('InvalidParamError');
  });

  test('Should not recover user password, because code is expiried', async () => {
    const body = makeBodyUpdateUserEmail(
      'email_new@test.com',
      'email_code_expiry',
    );

    const token = (
      await request(await getHttpServer())
        .post('/api/users/login')
        .send({
          email: 'email_verified_code_expiry@test.com',
          password: 'Password1234',
        })
    ).body;

    const response = await request(await getHttpServer())
      .patch(`/api/users/email?email=${body.email}&code=${body.code}`)
      .set('Authorization', `Bearer ${token}`);

    expect(response.statusCode).toBe(400);
    expect(response.body.error).toBe('InvalidParamError');
  });

  test('Should update user email', async () => {
    const body = makeBodyUpdateUserEmail('email@test.com', 'email_code');

    const token = (
      await request(await getHttpServer())
        .post('/api/users/login')
        .send({
          email: 'email_verified@test.com',
          password: 'Password1234',
        })
    ).body;

    const response = await request(await getHttpServer())
      .patch(`/api/users/email?email=${body.email}&code=${body.code}`)
      .set('Authorization', `Bearer ${token}`);

    expect(response.statusCode).toBe(200);
    expect(response.body).toBe('1');
  });
});
