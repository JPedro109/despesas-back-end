jest.setTimeout(10000);

import {
  initApp,
  before,
  after,
  getHttpServer,
  loginGraphql,
} from '../../../__mocks__';

import * as request from 'supertest';

const makeBody = (password: unknown, passwordConfirm: unknown) => {
  return {
    password,
    passwordConfirm,
  };
};

describe('deleteUser - MUTATION', () => {
  beforeEach(async () => {
    const { module } = await initApp();
    await before(module);
  });

  afterEach(async () => {
    const { module, app } = await initApp();
    await after(app, module);
  });

  const query =
    'mutation DeleteUser($data: DeleteUserInput!) { deleteUser(data: $data) }';

  test('Should not delete user, because password is null', async () => {
    const body = makeBody(null, 'Password1234');

    const token = await loginGraphql('email_verified@test.com');

    const response = await request(await getHttpServer())
      .post('/graphql')
      .set('authorization', `Bearer ${token}`)
      .send({
        query,
        variables: { data: body },
      });

    expect(response.body.errors[0].code).toBe('BAD_USER_INPUT');
  });

  test('Should not delete user, because passwordConfirm is null', async () => {
    const body = makeBody('Password1234', null);

    const token = await loginGraphql('email_verified@test.com');

    const response = await request(await getHttpServer())
      .post('/graphql')
      .set('authorization', `Bearer ${token}`)
      .send({
        query,
        variables: { data: body },
      });
    expect(response.body.errors[0].code).toBe('BAD_USER_INPUT');
  });

  test('Should not delete user, because passwords is not match', async () => {
    const body = makeBody('Password1234', 'Password12345');

    const token = await loginGraphql('email_verified@test.com');

    const response = await request(await getHttpServer())
      .post('/graphql')
      .set('authorization', `Bearer ${token}`)
      .send({
        query,
        variables: { data: body },
      });
    expect(response.body.errors[0].code).toBe('InvalidParamError');
  });

  test('Should not delete user, because password is invalid', async () => {
    const body = makeBody('password', 'password');

    const token = await loginGraphql('email_verified@test.com');

    const response = await request(await getHttpServer())
      .post('/graphql')
      .set('authorization', `Bearer ${token}`)
      .send({
        query,
        variables: { data: body },
      });
    expect(response.body.errors[0].code).toBe('InvalidParamError');
  });

  test('Should delete user', async () => {
    const body = makeBody('Password1234', 'Password1234');

    const token = await loginGraphql('email_verified@test.com');

    const response = await request(await getHttpServer())
      .post('/graphql')
      .set('authorization', `Bearer ${token}`)
      .send({
        query,
        variables: { data: body },
      });
    expect(response.body.data.deleteUser).toBe('1');
  });
});
