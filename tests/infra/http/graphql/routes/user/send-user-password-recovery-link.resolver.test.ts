jest.setTimeout(10000);

import { setup, getHttpServer } from '../../../__mocks__';

import * as request from 'supertest';

const makeBodySendUserPasswordRecoverylink = (email: unknown) => {
  return {
    email,
  };
};

describe('sendUserPasswordRecoveryLink - MUTATION', () => {
  setup();

  const query =
    'mutation SendUserPasswordRecoveryLink($data: SendUserPasswordRecoveryLinkInput!) { sendUserPasswordRecoveryLink(data: $data) }';

  test('Should not send user password recovery link, because email is null', async () => {
    const body = makeBodySendUserPasswordRecoverylink(null);

    const response = await request(await getHttpServer())
      .post('/graphql')
      .send({
        query,
        variables: { data: body },
      });

    expect(response.body.errors[0].code).toBe('BAD_USER_INPUT');
  });

  test('Should not send user password recovery link, because email is not register', async () => {
    const body = makeBodySendUserPasswordRecoverylink(
      'email_is_not_register@test.com',
    );

    const response = await request(await getHttpServer())
      .post('/graphql')
      .send({
        query,
        variables: { data: body },
      });

    expect(response.body.errors[0].code).toBe('NotFoundError');
  });

  test('Should send user password recovery link', async () => {
    const body = makeBodySendUserPasswordRecoverylink(
      'email_verified@test.com',
    );

    const response = await request(await getHttpServer())
      .post('/graphql')
      .send({
        query,
        variables: { data: body },
      });

    expect(response.body.data.sendUserPasswordRecoveryLink).toBe(body.email);
  });
});
