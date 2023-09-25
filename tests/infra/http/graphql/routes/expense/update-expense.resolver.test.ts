jest.setTimeout(10000);

import { setup, loginGraphql, getHttpServer } from '../../../__mocks__';

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

describe('updateExpense - MUTATION', () => {
  setup();

  const query =
    'mutation UpdateExpense($data: UpdateExpenseInput!) { updateExpense(data: $data) { expenseName, expenseValue } }';

  test('Should not update expense, because expense is null', async () => {
    const body = makeBodyUpdateExpense('4', null, 200, '3000-01-01');

    const token = await loginGraphql('email_verified@test.com');

    const response = await request(await getHttpServer())
      .post(`/graphql`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        query,
        variables: { data: body },
      });

    expect(response.body.errors[0].code).toBe('BAD_USER_INPUT');
  });

  test('Should not update expense, because expenseValue is null', async () => {
    const body = makeBodyUpdateExpense('4', 'expense', null, '3000-01-01');

    const token = await loginGraphql('email_verified@test.com');

    const response = await request(await getHttpServer())
      .post(`/graphql`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        query,
        variables: { data: body },
      });

    expect(response.body.errors[0].code).toBe('BAD_USER_INPUT');
  });

  test('Should not update expense, because due date is null', async () => {
    const body = makeBodyUpdateExpense('4', 'expense', 200, null);

    const token = await loginGraphql('email_verified@test.com');

    const response = await request(await getHttpServer())
      .post(`/graphql`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        query,
        variables: { data: body },
      });

    expect(response.body.errors[0].code).toBe('BAD_USER_INPUT');
  });

  test('Should not update expense, because expense value is with type error', async () => {
    const body = makeBodyUpdateExpense(
      '4',
      'expense',
      'value_Error',
      '3000-01-01',
    );

    const token = await loginGraphql('email_verified@test.com');

    const response = await request(await getHttpServer())
      .post(`/graphql`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        query,
        variables: { data: body },
      });

    expect(response.body.errors[0].code).toBe('BAD_USER_INPUT');
  });

  test('Should not update expense, because due date is with type error', async () => {
    const body = makeBodyUpdateExpense('4', 'expense', 200, '3000-0-0');

    const token = await loginGraphql('email_verified@test.com');

    const response = await request(await getHttpServer())
      .post(`/graphql`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        query,
        variables: { data: body },
      });

    expect(response.body.errors[0].code).toBe('BAD_REQUEST');
  });

  test('Should not update expense, because expense name is incorrect', async () => {
    const body = makeBodyUpdateExpense('4', 'c'.repeat(300), 200, '3000-01-01');

    const token = await loginGraphql('email_verified@test.com');

    const response = await request(await getHttpServer())
      .post(`/graphql`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        query,
        variables: { data: body },
      });

    expect(response.body.errors[0].code).toBe('InvalidExpenseNameError');
  });

  test('Should not update expense, because expense value is incorrect', async () => {
    const body = makeBodyUpdateExpense('4', 'expense', -200, '3000-01-01');

    const token = await loginGraphql('email_verified@test.com');

    const response = await request(await getHttpServer())
      .post(`/graphql`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        query,
        variables: { data: body },
      });

    expect(response.body.errors[0].code).toBe('InvalidExpenseValueError');
  });

  test('Should not update expense, because due date is incorrect', async () => {
    const body = makeBodyUpdateExpense('4', 'expense', 200, '2000-01-01');

    const token = await loginGraphql('email_verified@test.com');

    const response = await request(await getHttpServer())
      .post(`/graphql`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        query,
        variables: { data: body },
      });

    expect(response.body.errors[0].code).toBe('InvalidDueDateError');
  });

  test('Should not update expense, because expense is not exists', async () => {
    const body = makeBodyUpdateExpense('0', 'expense', 200, '2000-01-01');

    const token = await loginGraphql('email_verified@test.com');

    const response = await request(await getHttpServer())
      .post(`/graphql`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        query,
        variables: { data: body },
      });

    expect(response.body.errors[0].code).toBe('NotFoundError');
  });

  test('Should update expense', async () => {
    const body = makeBodyUpdateExpense('4', 'expense-two', 300, '3000-02-01');

    const token = await loginGraphql('email_verified@test.com');

    const response = await request(await getHttpServer())
      .post(`/graphql`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        query,
        variables: { data: body },
      });

    expect(response.body.data.updateExpense.expenseName).toBe('expense-two');
    expect(response.body.data.updateExpense.expenseValue).toBe(300);
  });
});
