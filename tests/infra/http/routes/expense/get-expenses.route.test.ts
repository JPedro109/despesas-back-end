import { initApp, before, after, getHttpServer } from '../__mocks__';
import * as request from 'supertest';

describe('/api/expenses - GET', () => {
  beforeEach(async () => {
    const { module } = await initApp();
    await before(module);
  });

  afterEach(async () => {
    const { module, app } = await initApp();
    await after(app, module);
  });

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
