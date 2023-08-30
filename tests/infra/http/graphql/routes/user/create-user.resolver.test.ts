jest.setTimeout(10000);

import { initApp, before, after, getHttpServer } from '../../../__mocks__';
import * as request from 'supertest';

const makeBodyCreateUser = (
  email: unknown,
  password: unknown,
  passwordConfirm: unknown,
) => {
  return {
    email,
    password,
    passwordConfirm,
  };
};

describe('createUser - MUTATION', () => {
  beforeEach(async () => {
    const { module } = await initApp();
    await before(module);
  });

  afterEach(async () => {
    const { module, app } = await initApp();
    await after(app, module);
  });

  const query =
    'mutation CreateUser($data: CreateUserInput!) { createUser(data: $data) }';

  test('Should not create user, because email is null', async () => {
    const body = makeBodyCreateUser('', 'Password1234', 'Password1234');

    const response = await request(await getHttpServer())
      .post('/graphql')
      .send({
        query,
        variables: { data: body },
      });

    expect(response.body.errors[0].code).toBe('InvalidEmailError');
  });

  test('Should not create user, because password is null', async () => {
    const body = makeBodyCreateUser('email@test.com', '', 'Password1234');

    const response = await request(await getHttpServer())
      .post('/graphql')
      .send({
        query,
        variables: { data: body },
      });

    expect(response.body.errors[0].code).toBe('InvalidParamError');
  });

  test('Should not create user, because email is invalid', async () => {
    const body = makeBodyCreateUser(
      'email.com',
      'Password1234',
      'Password1234',
    );

    const response = await request(await getHttpServer())
      .post('/graphql')
      .send({
        query,
        variables: { data: body },
      });

    expect(response.body.errors[0].code).toBe('InvalidEmailError');
  });

  test('Should not create user, because email already is register', async () => {
    const body = makeBodyCreateUser(
      'email_verified@test.com',
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

  test('Should not create user, because password is not respect rules', async () => {
    const body = makeBodyCreateUser('email@test.com', 'password', 'password');

    const response = await request(await getHttpServer())
      .post('/graphql')
      .send({
        query,
        variables: { data: body },
      });

    expect(response.body.errors[0].code).toBe('InvalidPasswordError');
  });

  test('Should not create user, because passwords is not match', async () => {
    const body = makeBodyCreateUser(
      'email@test.com',
      'Password1234',
      'Password12345',
    );

    const response = await request(await getHttpServer())
      .post('/graphql')
      .send({
        query,
        variables: { data: body },
      });

    expect(response.body.errors[0].code).toBe('InvalidParamError');
  });

  test('Should create user', async () => {
    const body = makeBodyCreateUser(
      'email@test.com',
      'Password1234',
      'Password1234',
    );

    const response = await request(await getHttpServer())
      .post('/graphql')
      .send({
        query,
        variables: { data: body },
      });

    expect(response.body.data.createUser).toBe(body.email);
  });
});
