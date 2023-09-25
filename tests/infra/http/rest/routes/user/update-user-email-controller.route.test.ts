jest.setTimeout(10000);

import { setup, getHttpServer, loginRest } from '../../../__mocks__';

import * as request from 'supertest';

const makeBodyUpdateUserEmail = (email: string, code: string) => {
  return {
    email,
    code,
  };
};

describe('/api/users/email - PATCH', () => {
  setup();

  test('Should not update user email, because email is empty', async () => {
    const body = makeBodyUpdateUserEmail('', 'token');

    const token = await loginRest('email_verified@test.com');

    const response = await request(await getHttpServer())
      .patch(`/api/users/email?email=${body.email}&code=${body.code}`)
      .set('Authorization', `Bearer ${token}`);

    expect(response.statusCode).toBe(400);
    expect(response.body.error).toBe('Bad Request');
  });

  test('Should not update user email, because code is empty', async () => {
    const body = makeBodyUpdateUserEmail('email@test.com', '');

    const token = await loginRest('email_verified@test.com');

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

    const token = await loginRest('email_verified@test.com');

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

    const token = await loginRest('email_verified_code_expiry@test.com');

    const response = await request(await getHttpServer())
      .patch(`/api/users/email?email=${body.email}&code=${body.code}`)
      .set('Authorization', `Bearer ${token}`);

    expect(response.statusCode).toBe(400);
    expect(response.body.error).toBe('InvalidParamError');
  });

  test('Should update user email', async () => {
    const body = makeBodyUpdateUserEmail('email@test.com', 'email_code');

    const token = await loginRest('email_verified@test.com');

    const response = await request(await getHttpServer())
      .patch(`/api/users/email?email=${body.email}&code=${body.code}`)
      .set('Authorization', `Bearer ${token}`);

    expect(response.statusCode).toBe(200);
    expect(response.body).toBe('1');
  });
});
