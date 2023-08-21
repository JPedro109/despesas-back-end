import { initApp, before, after, getHttpServer } from '../../../__mocks__';
import * as request from 'supertest';

const makeBodyDeleteExpense = (id: string) => {
  return {
    id,
  };
};

describe('/api/expenses/:id - DELETE', () => {
  beforeEach(async () => {
    const { module } = await initApp();
    await before(module);
  });

  afterEach(async () => {
    const { module, app } = await initApp();
    await after(app, module);
  });

  test('Should not delete expense, because expense is not exists', async () => {
    const body = makeBodyDeleteExpense('0');

    const token = (
      await request(await getHttpServer())
        .post('/api/users/login')
        .send({
          email: 'email_verified@test.com',
          password: 'Password1234',
        })
    ).body;

    const response = await request(await getHttpServer())
      .delete(`/api/expenses/${body.id}`)
      .set('Authorization', `Bearer ${token}`);

    expect(response.statusCode).toBe(404);
    expect(response.body.error).toBe('NotFoundError');
  });

  test('Should delete expense', async () => {
    const body = makeBodyDeleteExpense('4');

    const token = (
      await request(await getHttpServer())
        .post('/api/users/login')
        .send({
          email: 'email_verified@test.com',
          password: 'Password1234',
        })
    ).body;

    const response = await request(await getHttpServer())
      .delete(`/api/expenses/${body.id}`)
      .set('Authorization', `Bearer ${token}`);

    expect(response.statusCode).toBe(200);
    expect(response.body.expenseName).toBe('expense');
    expect(response.body.expenseValue).toBe(100);
  });
});
