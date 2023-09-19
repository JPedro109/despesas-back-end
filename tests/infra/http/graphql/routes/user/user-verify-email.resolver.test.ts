jest.setTimeout(10000);

import { setup, getHttpServer } from '../../../__mocks__';

import * as request from 'supertest';

const makeBodyVerifyEmailUser = (email: string, code: string) => {
  return {
    email,
    code,
  };
};

describe('userVerifyEmail - MUTATION', () => {
  setup();

  const query =
    'mutation UserVerifyEmail($data: UserVerifyEmailInput!) { userVerifyEmail(data: $data) }';

  test('Should not verify email user, because email is null', async () => {
    const body = makeBodyVerifyEmailUser(null, 'code');

    const response = await request(await getHttpServer())
      .post('/graphql')
      .send({
        query,
        variables: { data: body },
      });

    expect(response.body.errors[0].code).toBe('BAD_USER_INPUT');
  });

  test('Should not verify email user, because code is null', async () => {
    const body = makeBodyVerifyEmailUser('email_not_verified@test.com', null);

    const response = await request(await getHttpServer())
      .post('/graphql')
      .send({
        query,
        variables: { data: body },
      });

    expect(response.body.errors[0].code).toBe('BAD_USER_INPUT');
  });

  test('Should not verify email user, because code is incorrect', async () => {
    const body = makeBodyVerifyEmailUser(
      'email_not_verified@test.com',
      'invalid_code',
    );

    const response = await request(await getHttpServer())
      .post('/graphql')
      .send({
        query,
        variables: { data: body },
      });

    expect(response.body.errors[0].code).toBe('InvalidParamError');
  });

  test('Should not verify email user, because email already is verified', async () => {
    const body = makeBodyVerifyEmailUser('email_verified@test.com', 'code');

    const response = await request(await getHttpServer())
      .post('/graphql')
      .send({
        query,
        variables: { data: body },
      });

    expect(response.body.errors[0].code).toBe('UnauthorizedError');
  });

  test('Should verify email user', async () => {
    const body = makeBodyVerifyEmailUser(
      'email_not_verified@test.com',
      'email_verification_code',
    );

    const response = await request(await getHttpServer())
      .post('/graphql')
      .send({
        query,
        variables: { data: body },
      });

    expect(response.body.data.userVerifyEmail).toBe(body.email);
  });
});
