import { initApp, before, after, getHttpServer } from '../__mocks__';

import * as request from 'supertest';

const makeBodyVerifyEmailUser = (id: string, code: string) => {
  return {
    id,
    code,
  };
};

describe('/api/users/verify-email - PATCH', () => {
  beforeEach(async () => {
    const { module } = await initApp();
    await before(module);
  });

  afterEach(async () => {
    const { module, app } = await initApp();
    await after(app, module);
  });

  test('Should not verify email user, because email is empty', async () => {
    const body = makeBodyVerifyEmailUser('', 'code');

    const response = await request(await getHttpServer())
      .patch(`/api/users/verify-email?email=${body.id}&code=${body.code}`)
      .send(body);

    expect(response.statusCode).toBe(400);
    expect(response.body.error).toBe('Bad Request');
  });

  test('Should not verify email user, because code is empty', async () => {
    const body = makeBodyVerifyEmailUser('email_not_verified@test.com', '');

    const response = await request(await getHttpServer())
      .patch(`/api/users/verify-email?email=${body.id}&code=${body.code}`)
      .send(body);

    expect(response.statusCode).toBe(400);
    expect(response.body.error).toBe('Bad Request');
  });

  test('Should not verify email user, because code is incorrect', async () => {
    const body = makeBodyVerifyEmailUser(
      'email_not_verified@test.com',
      'invalid_code',
    );

    const response = await request(await getHttpServer())
      .patch(`/api/users/verify-email?email=${body.id}&code=${body.code}`)
      .send(body);

    expect(response.statusCode).toBe(400);
    expect(response.body.error).toBe('InvalidParamError');
  });

  test('Should not verify email user, because user is not exists', async () => {
    const body = makeBodyVerifyEmailUser('email_isnotexists@test.com', 'code');

    const response = await request(await getHttpServer())
      .patch(`/api/users/verify-email?email=${body.id}&code=${body.code}`)
      .send(body);

    expect(response.statusCode).toBe(404);
    expect(response.body.error).toBe('NotFoundError');
  });

  test('Should not verify email user, because email already is verified', async () => {
    const body = makeBodyVerifyEmailUser('email_verified@test.com', 'code');

    const response = await request(await getHttpServer())
      .patch(`/api/users/verify-email?email=${body.id}&code=${body.code}`)
      .send(body);

    expect(response.statusCode).toBe(401);
    expect(response.body.error).toBe('UnauthorizedError');
  });

  test('Should verify email user', async () => {
    const body = makeBodyVerifyEmailUser(
      'email_not_verified@test.com',
      'email_verification_code',
    );

    const response = await request(await getHttpServer())
      .patch(`/api/users/verify-email?email=${body.id}&code=${body.code}`)
      .send(body);

    expect(response.statusCode).toBe(200);
    expect(response.body).toBe(body.id);
  });
});
