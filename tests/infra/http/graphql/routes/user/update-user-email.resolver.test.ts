jest.setTimeout(10000);

import { setup, loginGraphql, getHttpServer } from '../../../__mocks__';

import * as request from 'supertest';

const makeBodyUpdateUserEmail = (email: string, code: string) => {
  return {
    email,
    code,
  };
};

describe('updateUserEmail - MUTATION', () => {
  setup();

  const query =
    'mutation UpdateUserEmail($data: UpdateUserEmailInput!) { updateUserEmail(data: $data) }';

  test('Should not update user email, because email is null', async () => {
    const body = makeBodyUpdateUserEmail(null, 'code');

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

  test('Should not update user email, because code is null', async () => {
    const body = makeBodyUpdateUserEmail('email@test.com', null);

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

  test('Should not update user email, because code is invalid', async () => {
    const body = makeBodyUpdateUserEmail(
      'email_verified@test.com',
      'code_invalid',
    );

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

  test('Should not recover user password, because code is expiried', async () => {
    const body = makeBodyUpdateUserEmail(
      'email_verified_code_expiry@test.com',
      'email_code_expiry',
    );

    const token = await loginGraphql('email_verified_code_expiry@test.com');

    const response = await request(await getHttpServer())
      .post('/graphql')
      .set('authorization', `Bearer ${token}`)
      .send({
        query,
        variables: { data: body },
      });

    expect(response.body.errors[0].code).toBe('InvalidParamError');
  });

  test('Should update user email', async () => {
    const body = makeBodyUpdateUserEmail('email@test.com', 'email_code');

    const token = await loginGraphql('email_verified@test.com');

    const response = await request(await getHttpServer())
      .post('/graphql')
      .set('authorization', `Bearer ${token}`)
      .send({
        query,
        variables: { data: body },
      });

    expect(response.body.data.updateUserEmail).toBe('1');
  });
});
