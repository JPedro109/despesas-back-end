jest.setTimeout(10000);

import { setup, getHttpServer } from '../../../__mocks__';

import * as request from 'supertest';

const makeBodyRecoverUserPassword = (
  email: string,
  code: string,
  password: unknown,
  passwordConfirm: unknown,
) => {
  return {
    email,
    code,
    password,
    passwordConfirm,
  };
};

describe('/api/users/password-recover - PATCH', () => {
  setup();

  test('Should not recover user password, because email is empty', async () => {
    const body = makeBodyRecoverUserPassword(
      '',
      'code',
      'Password1234',
      'Password1234',
    );

    const response = await request(await getHttpServer())
      .patch(
        `/api/users/password-recover?email=${body.email}&code=${body.code}`,
      )
      .send(body);

    expect(response.statusCode).toBe(400);
    expect(response.body.error).toBe('Bad Request');
  });

  test('Should not recover user password, because code is empty', async () => {
    const body = makeBodyRecoverUserPassword(
      'email_verified@test.com',
      '',
      'Password1234',
      'Password1234',
    );

    const response = await request(await getHttpServer())
      .patch(
        `/api/users/password-recover?email=${body.email}&code=${body.code}`,
      )
      .send(body);

    expect(response.statusCode).toBe(400);
    expect(response.body.error).toBe('Bad Request');
  });

  test('Should not recover user password, because password is empty', async () => {
    const body = makeBodyRecoverUserPassword(
      'email@test.com',
      'code',
      '',
      'Password1234',
    );

    const response = await request(await getHttpServer())
      .patch(
        `/api/users/password-recover?email=${body.email}&code=${body.code}`,
      )
      .send(body);

    expect(response.statusCode).toBe(400);
    expect(response.body.error).toBe('Bad Request');
  });

  test('Should not recover user password, because password confirm is empty', async () => {
    const body = makeBodyRecoverUserPassword(
      'email@test.com',
      'code',
      'Password1234',
      '',
    );

    const response = await request(await getHttpServer())
      .patch(
        `/api/users/password-recover?email=${body.email}&code=${body.code}`,
      )
      .send(body);

    expect(response.statusCode).toBe(400);
    expect(response.body.error).toBe('Bad Request');
  });

  test('Should not recover user password, because password is with type error', async () => {
    const body = makeBodyRecoverUserPassword(
      'email@test.com',
      'code',
      100,
      'Password1234',
    );

    const response = await request(await getHttpServer())
      .patch(
        `/api/users/password-recover?email=${body.email}&code=${body.code}`,
      )
      .send(body);

    expect(response.statusCode).toBe(400);
    expect(response.body.error).toBe('Bad Request');
  });

  test('Should not recover user password, because password confirm is with type error', async () => {
    const body = makeBodyRecoverUserPassword(
      'email@test.com',
      'code',
      'Password1234',
      100,
    );

    const response = await request(await getHttpServer())
      .patch(
        `/api/users/password-recover?email=${body.email}&code=${body.code}`,
      )
      .send(body);

    expect(response.statusCode).toBe(400);
    expect(response.body.error).toBe('Bad Request');
  });

  test('Should not recover user password, because user is not exists', async () => {
    const body = makeBodyRecoverUserPassword(
      'email_is_not_exists@test.com',
      'code',
      'Password1234',
      'Password1234',
    );

    const response = await request(await getHttpServer())
      .patch(
        `/api/users/password-recover?email=${body.email}&code=${body.code}`,
      )
      .send(body);

    expect(response.statusCode).toBe(404);
    expect(response.body.error).toBe('NotFoundError');
  });

  test('Should not recover user password, because code is invalid', async () => {
    const body = makeBodyRecoverUserPassword(
      'email_verified@test.com',
      'code_invalid',
      'Password1234',
      'Password1234',
    );

    const response = await request(await getHttpServer())
      .patch(
        `/api/users/password-recover?email=${body.email}&code=${body.code}`,
      )
      .send(body);

    expect(response.statusCode).toBe(400);
    expect(response.body.error).toBe('InvalidParamError');
  });

  test('Should not recover user password, because code is expiried', async () => {
    const body = makeBodyRecoverUserPassword(
      'email_verified_code_expiry@test.com',
      'password_code_expiry',
      'Password1234',
      'Password1234',
    );

    const response = await request(await getHttpServer())
      .patch(
        `/api/users/password-recover?email=${body.email}&code=${body.code}`,
      )
      .send(body);

    expect(response.statusCode).toBe(400);
    expect(response.body.error).toBe('InvalidParamError');
  });

  test('Should not recover user password, because passwords is not match', async () => {
    const body = makeBodyRecoverUserPassword(
      'email_verified_code_expiry',
      'code',
      'Password12345',
      'Password1234',
    );

    const response = await request(await getHttpServer())
      .patch(
        `/api/users/password-recover?email=${body.email}&code=${body.code}`,
      )
      .send(body);

    expect(response.statusCode).toBe(400);
    expect(response.body.error).toBe('InvalidParamError');
  });

  test('Should not recover user password, because passwords is not respect password rules', async () => {
    const body = makeBodyRecoverUserPassword(
      'email_verified_code_expiry@test.com',
      'code',
      'password',
      'password',
    );

    const response = await request(await getHttpServer())
      .patch(
        `/api/users/password-recover?email=${body.email}&code=${body.code}`,
      )
      .send(body);

    expect(response.statusCode).toBe(400);
    expect(response.body.error).toBe('InvalidPasswordError');
  });

  test('Should not recover user password, because new password is equal the current password', async () => {
    const body = makeBodyRecoverUserPassword(
      'email_verified@test.com',
      'code',
      'Password1234',
      'Password1234',
    );

    const response = await request(await getHttpServer())
      .patch(
        `/api/users/password-recover?email=${body.email}&code=${body.code}`,
      )
      .send({
        password: body.password,
        passwordConfirm: body.passwordConfirm,
      });

    expect(response.statusCode).toBe(400);
    expect(response.body.error).toBe('InvalidParamError');
  });

  test('Should recover user password', async () => {
    const body = makeBodyRecoverUserPassword(
      'email_verified@test.com',
      'password_code',
      'Password12345',
      'Password12345',
    );

    const response = await request(await getHttpServer())
      .patch(
        `/api/users/password-recover?email=${body.email}&code=${body.code}`,
      )
      .send({
        password: body.password,
        passwordConfirm: body.passwordConfirm,
      });

    expect(response.statusCode).toBe(200);
    expect(response.body).toBe(body.email);
  });
});
