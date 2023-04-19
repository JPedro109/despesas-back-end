import { initApp, before, after, getHttpServer } from '../__mocks__';
import * as request from 'supertest';

const makeBodyCreateUser = (
  expenseName: unknown,
  expenseValue?: unknown,
  dueDate?: unknown,
) => {
  return {
    expenseName,
    expenseValue,
    dueDate,
  };
};

describe('/api/expenses - POST', () => {
  beforeEach(async () => {
    const { module } = await initApp();
    await before(module);
  });

  afterEach(async () => {
    const { module, app } = await initApp();
    await after(app, module);
  });

  test('Should not create expense, because expense is empty', async () => {
    const body = makeBodyCreateUser('', 200, '3000-01-01');

    const token = (
      await request(await getHttpServer())
        .post('/api/users/login')
        .send({
          email: 'email_verified@test.com',
          password: 'Password1234',
        })
    ).body;

    const response = await request(await getHttpServer())
      .post('/api/expenses')
      .set('Authorization', `Bearer ${token}`)
      .send(body);

    expect(response.statusCode).toBe(400);
    expect(response.body.error).toBe('Bad Request');
  });

  test('Should not create expense, because expenseValue is empty', async () => {
    const body = makeBodyCreateUser('expense', null, '3000-01-01');

    const token = (
      await request(await getHttpServer())
        .post('/api/users/login')
        .send({
          email: 'email_verified@test.com',
          password: 'Password1234',
        })
    ).body;

    const response = await request(await getHttpServer())
      .post('/api/expenses')
      .set('Authorization', `Bearer ${token}`)
      .send(body);

    expect(response.statusCode).toBe(400);
    expect(response.body.error).toBe('Bad Request');
  });

  test('Should not create expense, because due date is empty', async () => {
    const body = makeBodyCreateUser('expense', 200, null);

    const token = (
      await request(await getHttpServer())
        .post('/api/users/login')
        .send({
          email: 'email_verified@test.com',
          password: 'Password1234',
        })
    ).body;

    const response = await request(await getHttpServer())
      .post('/api/expenses')
      .set('Authorization', `Bearer ${token}`)
      .send(body);

    expect(response.statusCode).toBe(400);
    expect(response.body.error).toBe('Bad Request');
  });

  test('Should not create expense, because expense is with type error', async () => {
    const body = makeBodyCreateUser(100, 200, '3000-01-01');

    const token = (
      await request(await getHttpServer())
        .post('/api/users/login')
        .send({
          email: 'email_verified@test.com',
          password: 'Password1234',
        })
    ).body;

    const response = await request(await getHttpServer())
      .post('/api/expenses')
      .set('Authorization', `Bearer ${token}`)
      .send(body);

    expect(response.statusCode).toBe(400);
    expect(response.body.error).toBe('Bad Request');
  });

  test('Should not create expense, because expenseValue is with type error', async () => {
    const body = makeBodyCreateUser('expense', 'value_invalid', '3000-01-01');

    const token = (
      await request(await getHttpServer())
        .post('/api/users/login')
        .send({
          email: 'email_verified@test.com',
          password: 'Password1234',
        })
    ).body;

    const response = await request(await getHttpServer())
      .post('/api/expenses')
      .set('Authorization', `Bearer ${token}`)
      .send(body);

    expect(response.statusCode).toBe(400);
    expect(response.body.error).toBe('Bad Request');
  });

  test('Should not create expense, because due date is with type error', async () => {
    const body = makeBodyCreateUser('expense', 200, '3000-0-0');

    const token = (
      await request(await getHttpServer())
        .post('/api/users/login')
        .send({
          email: 'email_verified@test.com',
          password: 'Password1234',
        })
    ).body;

    const response = await request(await getHttpServer())
      .post('/api/expenses')
      .set('Authorization', `Bearer ${token}`)
      .send(body);

    expect(response.statusCode).toBe(400);
    expect(response.body.error).toBe('Bad Request');
  });

  test('Should not create expense, because expense name is incorret', async () => {
    const body = makeBodyCreateUser('c'.repeat(300), 200, '3000-01-01');

    const token = (
      await request(await getHttpServer())
        .post('/api/users/login')
        .send({
          email: 'email_verified@test.com',
          password: 'Password1234',
        })
    ).body;

    const response = await request(await getHttpServer())
      .post('/api/expenses')
      .set('Authorization', `Bearer ${token}`)
      .send(body);

    expect(response.statusCode).toBe(400);
    expect(response.body.error).toBe('InvalidExpenseNameError');
  });

  test('Should not create expense, because expense value is incorret', async () => {
    const body = makeBodyCreateUser('expense', -200, '3000-01-01');

    const token = (
      await request(await getHttpServer())
        .post('/api/users/login')
        .send({
          email: 'email_verified@test.com',
          password: 'Password1234',
        })
    ).body;

    const response = await request(await getHttpServer())
      .post('/api/expenses')
      .set('Authorization', `Bearer ${token}`)
      .send(body);

    expect(response.statusCode).toBe(400);
    expect(response.body.error).toBe('InvalidExpenseValueError');
  });

  test('Should not create expense, because due date is incorret', async () => {
    const body = makeBodyCreateUser('expense', 200, '2000-01-01');

    const token = (
      await request(await getHttpServer())
        .post('/api/users/login')
        .send({
          email: 'email_verified@test.com',
          password: 'Password1234',
        })
    ).body;

    const response = await request(await getHttpServer())
      .post('/api/expenses')
      .set('Authorization', `Bearer ${token}`)
      .send(body);

    expect(response.statusCode).toBe(400);
    expect(response.body.error).toBe('InvalidDueDateError');
  });

  test('Should create expense', async () => {
    const body = makeBodyCreateUser('expense', 100, '3000-01-01');

    const token = (
      await request(await getHttpServer())
        .post('/api/users/login')
        .send({
          email: 'email_verified@test.com',
          password: 'Password1234',
        })
    ).body;

    const response = await request(await getHttpServer())
      .post('/api/expenses')
      .set('Authorization', `Bearer ${token}`)
      .send(body);

    expect(response.statusCode).toBe(201);
    expect(response.body.expenseName).toBe(body.expenseName);
    expect(response.body.expenseValue).toBe(body.expenseValue);
  });
});
