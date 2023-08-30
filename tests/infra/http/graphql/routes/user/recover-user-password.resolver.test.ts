jest.setTimeout(10000);

import { initApp, before, after, getHttpServer } from '../../../__mocks__';

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

describe('recoverUserPassword - MUTATION', () => {
  beforeEach(async () => {
    const { module } = await initApp();
    await before(module);
  });

  afterEach(async () => {
    const { module, app } = await initApp();
    await after(app, module);
  });

  const query =
    'mutation RecoverUserPassword($data: RecoverUserPasswordInput!) { recoverUserPassword(data: $data) }';

  test('Should not recover user password, because email is null', async () => {
    const body = makeBodyRecoverUserPassword(
      null,
      'code',
      'Password1234',
      'Password1234',
    );

    const response = await request(await getHttpServer())
      .post('/graphql')
      .send({
        query,
        variables: { data: body },
      });

    expect(response.body.errors[0].code).toBe('BAD_USER_INPUT');
  });

  test('Should not recover user password, because code is null', async () => {
    const body = makeBodyRecoverUserPassword(
      'email@test.com',
      null,
      'Password1234',
      'Password1234',
    );

    const response = await request(await getHttpServer())
      .post('/graphql')
      .send({
        query,
        variables: { data: body },
      });

    expect(response.body.errors[0].code).toBe('BAD_USER_INPUT');
  });

  test('Should not recover user password, because password is null', async () => {
    const body = makeBodyRecoverUserPassword(
      'email@test.com',
      'code',
      null,
      'Password1234',
    );

    const response = await request(await getHttpServer())
      .post('/graphql')
      .send({
        query,
        variables: { data: body },
      });

    expect(response.body.errors[0].code).toBe('BAD_USER_INPUT');
  });

  test('Should not recover user password, because password confirm is null', async () => {
    const body = makeBodyRecoverUserPassword(
      'email@test.com',
      'code',
      'Password1234',
      null,
    );

    const response = await request(await getHttpServer())
      .post('/graphql')
      .send({
        query,
        variables: { data: body },
      });

    expect(response.body.errors[0].code).toBe('BAD_USER_INPUT');
  });

  test('Should not recover user password, because user is not exists', async () => {
    const body = makeBodyRecoverUserPassword(
      'email_is_not_exists@test.com',
      'password_code',
      'Password1234',
      'Password1234',
    );

    const response = await request(await getHttpServer())
      .post('/graphql')
      .send({
        query,
        variables: { data: body },
      });

    expect(response.body.errors[0].code).toBe('NotFoundError');
  });

  test('Should not recover user password, because code is invalid', async () => {
    const body = makeBodyRecoverUserPassword(
      'email_verified@test.com',
      'code_invalid',
      'Password1234',
      'Password1234',
    );

    const response = await request(await getHttpServer())
      .post('/graphql')
      .send({
        query,
        variables: { data: body },
      });

    expect(response.body.errors[0].code).toBe('InvalidParamError');
  });

  test('Should not recover user password, because code is expiried', async () => {
    const body = makeBodyRecoverUserPassword(
      'email_verified_code_expiry@test.com',
      'password_code_expiry',
      'Password1234',
      'Password1234',
    );

    const response = await request(await getHttpServer())
      .post('/graphql')
      .send({
        query,
        variables: { data: body },
      });

    expect(response.body.errors[0].code).toBe('InvalidParamError');
  });

  test('Should not recover user password, because passwords is not match', async () => {
    const body = makeBodyRecoverUserPassword(
      'email_verified@test.com',
      'password_code',
      'Password12345',
      'Password1234',
    );

    const response = await request(await getHttpServer())
      .post('/graphql')
      .send({
        query,
        variables: { data: body },
      });

    expect(response.body.errors[0].code).toBe('InvalidParamError');
  });

  test('Should not recover user password, because passwords is not respect password rules', async () => {
    const body = makeBodyRecoverUserPassword(
      'email_verified@test.com',
      'password_code',
      'password',
      'password',
    );

    const response = await request(await getHttpServer())
      .post('/graphql')
      .send({
        query,
        variables: { data: body },
      });

    expect(response.body.errors[0].code).toBe('InvalidPasswordError');
  });

  test('Should not recover user password, because new password is match current password', async () => {
    const body = makeBodyRecoverUserPassword(
      'email_verified@test.com',
      'password_code',
      'Password1234',
      'Password1234',
    );

    const response = await request(await getHttpServer())
      .post('/graphql')
      .send({
        query,
        variables: { data: body },
      });

    expect(response.body.errors[0].code).toBe('InvalidParamError');
  });

  test('Should recover user password', async () => {
    const body = makeBodyRecoverUserPassword(
      'email_verified@test.com',
      'password_code',
      'Password12345',
      'Password12345',
    );

    const response = await request(await getHttpServer())
      .post('/graphql')
      .send({
        query,
        variables: { data: body },
      });

    expect(response.body.data.recoverUserPassword).toBe(body.email);
  });
});
