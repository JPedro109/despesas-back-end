import { initApp, before, after, getHttpServer } from '../__mocks__';
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

describe('/api/users - POST', () => {
  beforeEach(async () => {
    const { module } = await initApp();
    await before(module);
  });

  afterEach(async () => {
    const { module, app } = await initApp();
    await after(app, module);
  });

  test('Should not create user, because email is empty', async () => {
    const body = makeBodyCreateUser('', 'Password1234', 'Password1234');

    const response = await request(await getHttpServer())
      .post('/api/users')
      .send(body);

    expect(response.statusCode).toBe(400);
    expect(response.body.error).toBe('Bad Request');
  });

  test('Should not create user, because password is empty', async () => {
    const body = makeBodyCreateUser('email@test.com', '', 'Password1234');

    const response = await request(await getHttpServer())
      .post('/api/users')
      .send(body);

    expect(response.statusCode).toBe(400);
    expect(response.body.error).toBe('Bad Request');
  });

  test('Should not create user, because passwordConfirm is empty', async () => {
    const body = makeBodyCreateUser('email@test.com', 'Password1234', '');

    const response = await request(await getHttpServer())
      .post('/api/users')
      .send(body);

    expect(response.statusCode).toBe(400);
    expect(response.body.error).toBe('Bad Request');
  });

  test('Should not create user, because email is with type error', async () => {
    const body = makeBodyCreateUser(100, 'Password1234', 'Password1234');

    const response = await request(await getHttpServer())
      .post('/api/users')
      .send(body);

    expect(response.statusCode).toBe(400);
    expect(response.body.error).toBe('Bad Request');
  });

  test('Should not create user, because password is with type error', async () => {
    const body = makeBodyCreateUser('email@test.com', 100, 'Password1234');

    const response = await request(await getHttpServer())
      .post('/api/users')
      .send(body);

    expect(response.statusCode).toBe(400);
    expect(response.body.error).toBe('Bad Request');
  });

  test('Should not create user, because passwordConfirm is with type error', async () => {
    const body = makeBodyCreateUser('email@test.com', 'Password1234', 100);

    const response = await request(await getHttpServer())
      .post('/api/users')
      .send(body);

    expect(response.statusCode).toBe(400);
    expect(response.body.error).toBe('Bad Request');
  });

  test('Should not create user, because email is invalid', async () => {
    const body = makeBodyCreateUser(
      'email.com',
      'Password1234',
      'Password1234',
    );

    const response = await request(await getHttpServer())
      .post('/api/users')
      .send(body);

    expect(response.statusCode).toBe(400);
    expect(response.body.error).toBe('InvalidEmailError');
  });

  test('Should not create user, because email already is register', async () => {
    const body = makeBodyCreateUser(
      'email_verified@test.com',
      'Password1234',
      'Password1234',
    );

    const response = await request(await getHttpServer())
      .post('/api/users')
      .send(body);

    expect(response.statusCode).toBe(400);
    expect(response.body.error).toBe('InvalidParamError');
  });

  test('Should not create user, because password is not respect rules', async () => {
    const body = makeBodyCreateUser('email@test.com', 'password', 'password');

    const response = await request(await getHttpServer())
      .post('/api/users')
      .send(body);

    expect(response.statusCode).toBe(400);
    expect(response.body.error).toBe('InvalidPasswordError');
  });

  test('Should not create user, because passwords is not match', async () => {
    const body = makeBodyCreateUser(
      'email@test.com',
      'Password1234',
      'Password12345',
    );

    const response = await request(await getHttpServer())
      .post('/api/users')
      .send(body);

    expect(response.statusCode).toBe(400);
    expect(response.body.error).toBe('InvalidParamError');
  });

  test('Should create user', async () => {
    const body = makeBodyCreateUser(
      'email_test@test.com',
      'Password1234',
      'Password1234',
    );

    const response = await request(await getHttpServer())
      .post('/api/users')
      .send(body);

    expect(response.statusCode).toBe(201);
    expect(response.body).toBe(body.email);
  });
});
