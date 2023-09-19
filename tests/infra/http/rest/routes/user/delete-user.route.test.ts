jest.setTimeout(10000);

import { setup, getHttpServer, loginRest } from '../../../__mocks__';

import * as request from 'supertest';

const makeBody = (password: unknown, passwordConfirm: unknown) => {
  return {
    password,
    passwordConfirm,
  };
};

describe('/api/users - DELETE', () => {
  setup();

  test('Should not delete user, because password is empty', async () => {
    const body = makeBody('', 'Password1234');

    const token = await loginRest('email_verified@test.com');

    const response = await request(await getHttpServer())
      .delete('/api/users')
      .set('Authorization', `Bearer ${token}`)
      .send(body);

    expect(response.statusCode).toBe(400);
    expect(response.body.error).toBe('Bad Request');
  });

  test('Should not delete user, because passwordConfirm is empty', async () => {
    const body = makeBody('Password1234', '');

    const token = await loginRest('email_verified@test.com');

    const response = await request(await getHttpServer())
      .delete('/api/users')
      .set('Authorization', `Bearer ${token}`)
      .send(body);

    expect(response.statusCode).toBe(400);
    expect(response.body.error).toBe('Bad Request');
  });

  test('Should not delete user, because password is with type error', async () => {
    const body = makeBody(100, 'Password1234');

    const token = await loginRest('email_verified@test.com');

    const response = await request(await getHttpServer())
      .delete('/api/users')
      .set('Authorization', `Bearer ${token}`)
      .send(body);

    expect(response.statusCode).toBe(400);
    expect(response.body.error).toBe('Bad Request');
  });

  test('Should not delete user, because passwordConfirm is with type error', async () => {
    const body = makeBody('Password1234', 100);

    const token = await loginRest('email_verified@test.com');

    const response = await request(await getHttpServer())
      .delete('/api/users')
      .set('Authorization', `Bearer ${token}`)
      .send(body);

    expect(response.statusCode).toBe(400);
    expect(response.body.error).toBe('Bad Request');
  });

  test('Should not delete user, because passwords is not match', async () => {
    const body = makeBody('Password1234', 'Password12345');

    const token = await loginRest('email_verified@test.com');

    const response = await request(await getHttpServer())
      .delete('/api/users')
      .set('Authorization', `Bearer ${token}`)
      .send(body);

    expect(response.statusCode).toBe(400);
    expect(response.body.error).toBe('InvalidParamError');
  });

  test('Should not delete user, because password is invalid', async () => {
    const body = makeBody('password', 'password');

    const token = await loginRest('email_verified@test.com');

    const response = await request(await getHttpServer())
      .delete('/api/users')
      .set('Authorization', `Bearer ${token}`)
      .send(body);

    expect(response.statusCode).toBe(400);
    expect(response.body.error).toBe('InvalidParamError');
  });

  test('Should delete user', async () => {
    const body = makeBody('Password1234', 'Password1234');

    const token = await loginRest('email_verified@test.com');

    const response = await request(await getHttpServer())
      .delete('/api/users')
      .set('Authorization', `Bearer ${token}`)
      .send(body);

    expect(response.statusCode).toBe(200);
    expect(response.body).toBe('1');
  });
});
