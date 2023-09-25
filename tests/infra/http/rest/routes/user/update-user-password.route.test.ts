jest.setTimeout(10000);

import { setup, getHttpServer, loginRest } from '../../../__mocks__';

import * as request from 'supertest';

const makeSutUpdateUserPassword = (
  password: unknown,
  newPassword: unknown,
  newPasswordConfirm: unknown,
) => {
  return {
    password,
    newPassword,
    newPasswordConfirm,
  };
};

describe('/api/users/password - PATCH', () => {
  setup();

  test('Should not update user password, because password is empty', async () => {
    const body = makeSutUpdateUserPassword(
      '',
      'Password12345',
      'Password12345',
    );

    const token = await loginRest('email_verified@test.com');

    const response = await request(await getHttpServer())
      .patch('/api/users/password')
      .set('Authorization', `Bearer ${token}`)
      .send(body);

    expect(response.statusCode).toBe(400);
    expect(response.body.error).toBe('Bad Request');
  });

  test('Should not update user password, because new password is empty', async () => {
    const body = makeSutUpdateUserPassword('Password1234', '', 'Password12345');

    const token = await loginRest('email_verified@test.com');

    const response = await request(await getHttpServer())
      .patch('/api/users/password')
      .set('Authorization', `Bearer ${token}`)
      .send(body);

    expect(response.statusCode).toBe(400);
    expect(response.body.error).toBe('Bad Request');
  });

  test('Should not update user password, because new password confirm is empty', async () => {
    const body = makeSutUpdateUserPassword('Password1234', 'Password12345', '');

    const token = await loginRest('email_verified@test.com');

    const response = await request(await getHttpServer())
      .patch('/api/users/password')
      .set('Authorization', `Bearer ${token}`)
      .send(body);

    expect(response.statusCode).toBe(400);
    expect(response.body.error).toBe('Bad Request');
  });

  test('Should not update user password, because password is with type error', async () => {
    const body = makeSutUpdateUserPassword(
      100,
      'Password12345',
      'Password12345',
    );

    const token = await loginRest('email_verified@test.com');

    const response = await request(await getHttpServer())
      .patch('/api/users/password')
      .set('Authorization', `Bearer ${token}`)
      .send(body);

    expect(response.statusCode).toBe(400);
    expect(response.body.error).toBe('Bad Request');
  });

  test('Should not update user password, because new password is with type error', async () => {
    const body = makeSutUpdateUserPassword(
      'Password1234',
      100,
      'Password12345',
    );

    const token = await loginRest('email_verified@test.com');

    const response = await request(await getHttpServer())
      .patch('/api/users/password')
      .set('Authorization', `Bearer ${token}`)
      .send(body);

    expect(response.statusCode).toBe(400);
    expect(response.body.error).toBe('Bad Request');
  });

  test('Should not update user password, because new password confirm is with type error', async () => {
    const body = makeSutUpdateUserPassword(
      'Password1234',
      'Password12345',
      100,
    );

    const token = await loginRest('email_verified@test.com');

    const response = await request(await getHttpServer())
      .patch('/api/users/password')
      .set('Authorization', `Bearer ${token}`)
      .send(body);

    expect(response.statusCode).toBe(400);
    expect(response.body.error).toBe('Bad Request');
  });

  test('Should not update user password, because password is not match with registered passwod in database', async () => {
    const body = makeSutUpdateUserPassword(
      'password',
      'Password12345',
      'Password12345',
    );

    const token = await loginRest('email_verified@test.com');

    const response = await request(await getHttpServer())
      .patch('/api/users/password')
      .set('Authorization', `Bearer ${token}`)
      .send(body);

    expect(response.statusCode).toBe(400);
    expect(response.body.error).toBe('InvalidParamError');
  });

  test('Should not update user password, because new is not respect password rules', async () => {
    const body = makeSutUpdateUserPassword(
      'Password1234',
      'password',
      'password',
    );

    const token = await loginRest('email_verified@test.com');

    const response = await request(await getHttpServer())
      .patch('/api/users/password')
      .set('Authorization', `Bearer ${token}`)
      .send(body);

    expect(response.statusCode).toBe(400);
    expect(response.body.error).toBe('InvalidPasswordError');
  });

  test('Should not update user password, because passwords is not match', async () => {
    const body = makeSutUpdateUserPassword(
      'Password1234',
      'Password123456',
      'Password12345',
    );

    const token = await loginRest('email_verified@test.com');

    const response = await request(await getHttpServer())
      .patch('/api/users/password')
      .set('Authorization', `Bearer ${token}`)
      .send(body);

    expect(response.statusCode).toBe(400);
    expect(response.body.error).toBe('InvalidParamError');
  });

  test('Should not update user password, because new password is match current password', async () => {
    const body = makeSutUpdateUserPassword(
      'Password1234',
      'Password1234',
      'Password1234',
    );

    const token = await loginRest('email_verified@test.com');

    const response = await request(await getHttpServer())
      .patch('/api/users/password')
      .set('Authorization', `Bearer ${token}`)
      .send(body);

    expect(response.statusCode).toBe(400);
    expect(response.body.error).toBe('InvalidParamError');
  });

  test('Should update user password', async () => {
    const body = makeSutUpdateUserPassword(
      'Password1234',
      'Password12345',
      'Password12345',
    );

    const token = await loginRest('email_verified@test.com');

    const response = await request(await getHttpServer())
      .patch('/api/users/password')
      .set('Authorization', `Bearer ${token}`)
      .send(body);

    expect(response.statusCode).toBe(200);
    expect(response.body).toBe('1');
  });
});
