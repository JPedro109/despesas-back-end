jest.setTimeout(10000);

import { setup, loginGraphql, getHttpServer } from '../../../__mocks__';
import * as request from 'supertest';

const makeBodyDeleteExpense = (id: string) => {
  return {
    id,
  };
};

describe('deleteExpense - MUTATION', () => {
  setup();

  const query =
    'mutation DeleteExpense($data: DeleteExpenseInput!) { deleteExpense(data: $data) { expenseName, expenseValue } }';

  test('Should not delete expense, because expense is not exists', async () => {
    const body = makeBodyDeleteExpense('0');

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

  test('Should delete expense', async () => {
    const body = makeBodyDeleteExpense('4');

    const token = await loginGraphql('email_verified@test.com');

    const response = await request(await getHttpServer())
      .post(`/graphql`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        query,
        variables: { data: body },
      });

    expect(response.body.data.deleteExpense.expenseName).toBe('expense');
    expect(response.body.data.deleteExpense.expenseValue).toBe(100);
  });
});
