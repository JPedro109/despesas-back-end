jest.setTimeout(10000);

import { setup, loginGraphql, getHttpServer } from '../../../__mocks__';
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

describe('createExpense - MUTATION', () => {
  setup();

  const query =
    'mutation CreateExpense($data: CreateExpenseInput!) { createExpense(data: $data) { expenseName, expenseValue } }';

  test('Should not create expense, because expense is null', async () => {
    const body = makeBodyCreateUser(null, 200, '3000-01-01');

    const token = await loginGraphql('email_verified@test.com');

    const response = await request(await getHttpServer())
      .post('/graphql')
      .set('Authorization', `Bearer ${token}`)
      .send({
        query,
        variables: { data: body },
      });

    expect(response.body.errors[0].code).toBe('BAD_USER_INPUT');
  });

  test('Should not create expense, because expenseValue is null', async () => {
    const body = makeBodyCreateUser('expense', null, '3000-01-01');

    const token = await loginGraphql('email_verified@test.com');

    const response = await request(await getHttpServer())
      .post('/graphql')
      .set('Authorization', `Bearer ${token}`)
      .send({
        query,
        variables: { data: body },
      });

    expect(response.body.errors[0].code).toBe('BAD_USER_INPUT');
  });

  test('Should not create expense, because due date is null', async () => {
    const body = makeBodyCreateUser('expense', 200, null);

    const token = await loginGraphql('email_verified@test.com');

    const response = await request(await getHttpServer())
      .post('/graphql')
      .set('Authorization', `Bearer ${token}`)
      .send({
        query,
        variables: { data: body },
      });

    expect(response.body.errors[0].code).toBe('BAD_USER_INPUT');
  });

  test('Should not create expense, because expense is with type error', async () => {
    const body = makeBodyCreateUser(100, 200, '3000-01-01');

    const token = await loginGraphql('email_verified@test.com');

    const response = await request(await getHttpServer())
      .post('/graphql')
      .set('Authorization', `Bearer ${token}`)
      .send({
        query,
        variables: { data: body },
      });

    expect(response.body.errors[0].code).toBe('BAD_USER_INPUT');
  });

  test('Should not create expense, because expenseValue is with type error', async () => {
    const body = makeBodyCreateUser('expense', 'value_invalid', '3000-01-01');

    const token = await loginGraphql('email_verified@test.com');

    const response = await request(await getHttpServer())
      .post('/graphql')
      .set('Authorization', `Bearer ${token}`)
      .send({
        query,
        variables: { data: body },
      });

    expect(response.body.errors[0].code).toBe('BAD_USER_INPUT');
  });

  test('Should not create expense, because due date is with type error', async () => {
    const body = makeBodyCreateUser('expense', 200, '3000-0-0');

    const token = await loginGraphql('email_verified@test.com');

    const response = await request(await getHttpServer())
      .post('/graphql')
      .set('Authorization', `Bearer ${token}`)
      .send({
        query,
        variables: { data: body },
      });

    expect(response.body.errors[0].code).toBe('BAD_REQUEST');
  });

  test('Should not create expense, because expense name is incorret', async () => {
    const body = makeBodyCreateUser('c'.repeat(300), 200, '3000-01-01');

    const token = await loginGraphql('email_verified@test.com');

    const response = await request(await getHttpServer())
      .post('/graphql')
      .set('Authorization', `Bearer ${token}`)
      .send({
        query,
        variables: { data: body },
      });

    expect(response.body.errors[0].code).toBe('InvalidExpenseNameError');
  });

  test('Should not create expense, because expense value is incorret', async () => {
    const body = makeBodyCreateUser('expense', -200, '3000-01-01');

    const token = await loginGraphql('email_verified@test.com');

    const response = await request(await getHttpServer())
      .post('/graphql')
      .set('Authorization', `Bearer ${token}`)
      .send({
        query,
        variables: { data: body },
      });

    expect(response.body.errors[0].code).toBe('InvalidExpenseValueError');
  });

  test('Should not create expense, because due date is incorret', async () => {
    const body = makeBodyCreateUser('expense', 200, '2000-01-01');

    const token = await loginGraphql('email_verified@test.com');

    const response = await request(await getHttpServer())
      .post('/graphql')
      .set('Authorization', `Bearer ${token}`)
      .send({
        query,
        variables: { data: body },
      });

    expect(response.body.errors[0].code).toBe('InvalidDueDateError');
  });

  test('Should create expense', async () => {
    const body = makeBodyCreateUser('expense', 100, '3000-01-01');

    const token = await loginGraphql('email_verified@test.com');

    const response = await request(await getHttpServer())
      .post('/graphql')
      .set('Authorization', `Bearer ${token}`)
      .send({
        query,
        variables: { data: body },
      });

    expect(response.body.data.createExpense.expenseName).toBe(body.expenseName);
    expect(response.body.data.createExpense.expenseValue).toBe(
      body.expenseValue,
    );
  });
});
