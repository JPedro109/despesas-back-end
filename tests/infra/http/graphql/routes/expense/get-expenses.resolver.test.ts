jest.setTimeout(10000);

import { setup, loginGraphql, getHttpServer } from '../../../__mocks__';

import * as request from 'supertest';

describe('getExpenses - QUERY', () => {
  setup();

  const query =
    'query GetExpenses { getExpenses { expenseName, expenseValue } }';

  test('Should get expenses', async () => {
    const token = await loginGraphql('email_verified@test.com');

    const response = await request(await getHttpServer())
      .post('/graphql')
      .set('Authorization', `Bearer ${token}`)
      .send({
        query,
      });

    expect(response.body.data.getExpenses[0].expenseName).toBe('expense');
    expect(response.body.data.getExpenses[0].expenseValue).toBe(100);
  });
});
