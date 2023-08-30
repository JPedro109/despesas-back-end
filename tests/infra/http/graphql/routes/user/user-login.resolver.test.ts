jest.setTimeout(10000);

import { initApp, before, after, getHttpServer } from '../../../__mocks__';

import * as request from 'supertest';

const makeBody = (email: unknown, password: unknown) => {
  return {
    email,
    password,
  };
};

describe('userLogin - MUTATION', () => {
  beforeEach(async () => {
    const { module } = await initApp();
    await before(module);
  });

  afterEach(async () => {
    const { module, app } = await initApp();
    await after(app, module);
  });

  const query =
    'mutation UserLogin($data: UserLoginInput!) { userLogin(data: $data) }';

  test('Should not login user, because email is null', async () => {
    const body = makeBody(null, 'Password1234');

    const response = await request(await getHttpServer())
      .post('/graphql')
      .send({
        query,
        variables: { data: body },
      });

    expect(response.body.errors[0].code).toBe('BAD_USER_INPUT');
  });

  test('Should not login user, because password is null', async () => {
    const body = makeBody('email@test.com', null);

    const response = await request(await getHttpServer())
      .post('/graphql')
      .send({
        query,
        variables: { data: body },
      });

    expect(response.body.errors[0].code).toBe('BAD_USER_INPUT');
  });

  test('Should not login user, because email is incorrect', async () => {
    const body = makeBody('email_is_not_exists@.com', 'Password1234');

    const response = await request(await getHttpServer())
      .post('/graphql')
      .send({
        query,
        variables: { data: body },
      });

    expect(response.body.errors[0].code).toBe('UnauthorizedError');
  });

  test('Should not login user, because password is incorrect', async () => {
    const body = makeBody('email_verified@.com', 'Password12345');

    const response = await request(await getHttpServer())
      .post('/graphql')
      .send({
        query,
        variables: { data: body },
      });

    expect(response.body.errors[0].code).toBe('UnauthorizedError');
  });

  test('Should not login user, because email is not verified', async () => {
    const body = makeBody('email_is_not_verified@.com', 'Password1234');

    const response = await request(await getHttpServer())
      .post('/graphql')
      .send({
        query,
        variables: { data: body },
      });

    expect(response.body.errors[0].code).toBe('UnauthorizedError');
  });

  test('Should login user', async () => {
    const body = makeBody('email_verified@test.com', 'Password1234');

    const response = await request(await getHttpServer())
      .post('/graphql')
      .send({
        query,
        variables: { data: body },
      });

    expect(typeof response.body.data.userLogin).toBe('string');
  });
});
