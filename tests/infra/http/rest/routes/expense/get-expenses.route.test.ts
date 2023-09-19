jest.setTimeout(10000);

import { setup, getHttpServer, loginRest } from '../../../__mocks__';

import * as request from 'supertest';

describe('/api/expenses - GET', () => {
  setup();

  test('Should get expenses', async () => {
    const token = await loginRest('email_verified@test.com');

    const response = await request(await getHttpServer())
      .get('/api/expenses')
      .set('Authorization', `Bearer ${token}`);

    expect(response.statusCode).toBe(200);
    expect(response.body[0].expenseName).toBe('expense');
    expect(response.body[0].expenseValue).toBe(100);
  });
});
