import { setup, getHttpServer } from '../../../__mocks__';
import * as request from 'supertest';

const makeBodyUpdateExpense = (
  id: string,
  expenseName: unknown,
  expenseValue: unknown,
  dueDate: unknown,
) => {
  return {
    id,
    expenseName,
    expenseValue,
    dueDate,
  };
};

describe('/api/expenses/:id - PUT', () => {
  setup();

  test('Should not update expense, because expense is empty', async () => {
    const body = makeBodyUpdateExpense('4', '', 200, '3000-01-01');

    const token = (
      await request(await getHttpServer())
        .post('/api/users/login')
        .send({
          email: 'email_verified@test.com',
          password: 'Password1234',
        })
    ).body;

    const response = await request(await getHttpServer())
      .put(`/api/expenses/${body.id}`)
      .set('Authorization', `Bearer ${token}`)
      .send(body);

    expect(response.statusCode).toBe(400);
    expect(response.body.error).toBe('Bad Request');
  });

  test('Should not update expense, because expenseValue is empty', async () => {
    const body = makeBodyUpdateExpense('4', 'expense', null, '3000-01-01');

    const token = (
      await request(await getHttpServer())
        .post('/api/users/login')
        .send({
          email: 'email_verified@test.com',
          password: 'Password1234',
        })
    ).body;

    const response = await request(await getHttpServer())
      .put(`/api/expenses/${body.id}`)
      .set('Authorization', `Bearer ${token}`)
      .send(body);

    expect(response.statusCode).toBe(400);
    expect(response.body.error).toBe('Bad Request');
  });

  test('Should not update expense, because due date is empty', async () => {
    const body = makeBodyUpdateExpense('4', 'expense', 200, null);

    const token = (
      await request(await getHttpServer())
        .post('/api/users/login')
        .send({
          email: 'email_verified@test.com',
          password: 'Password1234',
        })
    ).body;

    const response = await request(await getHttpServer())
      .put(`/api/expenses/${body.id}`)
      .set('Authorization', `Bearer ${token}`)
      .send(body);

    expect(response.statusCode).toBe(400);
    expect(response.body.error).toBe('Bad Request');
  });

  test('Should not update expense, because expense is with type error', async () => {
    const body = makeBodyUpdateExpense('4', 100, 200, '3000-01-01');

    const token = (
      await request(await getHttpServer())
        .post('/api/users/login')
        .send({
          email: 'email_verified@test.com',
          password: 'Password1234',
        })
    ).body;

    const response = await request(await getHttpServer())
      .put(`/api/expenses/${body.id}`)
      .set('Authorization', `Bearer ${token}`)
      .send(body);

    expect(response.statusCode).toBe(400);
    expect(response.body.error).toBe('Bad Request');
  });

  test('Should not update expense, because expense value is with type error', async () => {
    const body = makeBodyUpdateExpense(
      '4',
      'expense',
      'value_Error',
      '3000-01-01',
    );

    const token = (
      await request(await getHttpServer())
        .post('/api/users/login')
        .send({
          email: 'email_verified@test.com',
          password: 'Password1234',
        })
    ).body;

    const response = await request(await getHttpServer())
      .put(`/api/expenses/${body.id}`)
      .set('Authorization', `Bearer ${token}`)
      .send(body);

    expect(response.statusCode).toBe(400);
    expect(response.body.error).toBe('Bad Request');
  });

  test('Should not update expense, because due date is with type error', async () => {
    const body = makeBodyUpdateExpense('4', 'expense', 200, '3000-0-0');

    const token = (
      await request(await getHttpServer())
        .post('/api/users/login')
        .send({
          email: 'email_verified@test.com',
          password: 'Password1234',
        })
    ).body;

    const response = await request(await getHttpServer())
      .put(`/api/expenses/${body.id}`)
      .set('Authorization', `Bearer ${token}`)
      .send(body);

    expect(response.statusCode).toBe(400);
    expect(response.body.error).toBe('Bad Request');
  });

  test('Should not update expense, because expense name is incorrect', async () => {
    const body = makeBodyUpdateExpense('4', 'c'.repeat(300), 200, '3000-01-01');

    const token = (
      await request(await getHttpServer())
        .post('/api/users/login')
        .send({
          email: 'email_verified@test.com',
          password: 'Password1234',
        })
    ).body;

    const response = await request(await getHttpServer())
      .put(`/api/expenses/${body.id}`)
      .set('Authorization', `Bearer ${token}`)
      .send(body);

    expect(response.statusCode).toBe(400);
    expect(response.body.error).toBe('InvalidExpenseNameError');
  });

  test('Should not update expense, because expense value is incorrect', async () => {
    const body = makeBodyUpdateExpense('4', 'expense', -200, '3000-01-01');

    const token = (
      await request(await getHttpServer())
        .post('/api/users/login')
        .send({
          email: 'email_verified@test.com',
          password: 'Password1234',
        })
    ).body;

    const response = await request(await getHttpServer())
      .put(`/api/expenses/${body.id}`)
      .set('Authorization', `Bearer ${token}`)
      .send(body);

    expect(response.statusCode).toBe(400);
    expect(response.body.error).toBe('InvalidExpenseValueError');
  });

  test('Should not update expense, because due date is incorrect', async () => {
    const body = makeBodyUpdateExpense('4', 'expense', 200, '2000-01-01');

    const token = (
      await request(await getHttpServer())
        .post('/api/users/login')
        .send({
          email: 'email_verified@test.com',
          password: 'Password1234',
        })
    ).body;

    const response = await request(await getHttpServer())
      .put(`/api/expenses/${body.id}`)
      .set('Authorization', `Bearer ${token}`)
      .send(body);

    expect(response.statusCode).toBe(400);
    expect(response.body.error).toBe('InvalidDueDateError');
  });

  test('Should not update expense, because expense is not exists', async () => {
    const body = makeBodyUpdateExpense('0', 'expense', 200, '2000-01-01');

    const token = (
      await request(await getHttpServer())
        .post('/api/users/login')
        .send({
          email: 'email_verified@test.com',
          password: 'Password1234',
        })
    ).body;

    const response = await request(await getHttpServer())
      .put(`/api/expenses/${body.id}`)
      .set('Authorization', `Bearer ${token}`)
      .send(body);

    expect(response.statusCode).toBe(404);
    expect(response.body.error).toBe('NotFoundError');
  });

  test('Should update expense', async () => {
    const body = makeBodyUpdateExpense('4', 'expense-two', 300, '3000-02-01');

    const token = (
      await request(await getHttpServer())
        .post('/api/users/login')
        .send({
          email: 'email_verified@test.com',
          password: 'Password1234',
        })
    ).body;

    const response = await request(await getHttpServer())
      .put(`/api/expenses/${body.id}`)
      .set('Authorization', `Bearer ${token}`)
      .send(body);

    expect(response.statusCode).toBe(200);
    expect(response.body.expenseName).toBe('expense-two');
    expect(response.body.expenseValue).toBe(300);
  });
});
