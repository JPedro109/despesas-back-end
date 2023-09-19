import { INestApplication } from '@nestjs/common';
import { setup, getHttpServer } from '../../../__mocks__';
import * as request from 'supertest';

describe('/api/expenses - GET', () => {
  setup();

  test('Should get expenses', async () => {
    const token = (
      await request(await getHttpServer())
        .post('/api/users/login')
        .send({
          email: 'email_verified@test.com',
          password: 'Password1234',
        })
    ).body;

    const response = await request(await getHttpServer())
      .get('/api/expenses')
      .set('Authorization', `Bearer ${token}`);

    expect(response.statusCode).toBe(200);
    expect(response.body[0].expenseName).toBe('expense');
    expect(response.body[0].expenseValue).toBe(100);
  });
});
