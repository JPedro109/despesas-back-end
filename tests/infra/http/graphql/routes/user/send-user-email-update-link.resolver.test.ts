jest.setTimeout(10000);

import { setup, loginGraphql, getHttpServer } from '../../../__mocks__';

import * as request from 'supertest';

const makeBodySendUserEmailUpdateLink = (email: unknown) => {
  return {
    email,
  };
};

describe('sendUserEmailUpdateLink - MUTATION', () => {
  setup();

  const query =
    'mutation SendUserEmailUpdateLink($data: SendUserEmailUpdateLinkInput!) { sendUserEmailUpdateLink(data: $data) }';

  test('Should not send user email update link, because email is null', async () => {
    const body = makeBodySendUserEmailUpdateLink(null);

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

  test('Should not send user email update link, because email is invalid', async () => {
    const body = makeBodySendUserEmailUpdateLink('email.com');

    const token = await loginGraphql('email_verified@test.com');

    const response = await request(await getHttpServer())
      .post('/graphql')
      .set('authorization', `Bearer ${token}`)
      .send({
        query,
        variables: { data: body },
      });

    expect(response.body.errors[0].code).toBe('InvalidEmailError');
  });

  test('Should not send user email update link, because email already is register', async () => {
    const body = makeBodySendUserEmailUpdateLink('email_verified@test.com');

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

  test('Should send user email update link', async () => {
    const body = makeBodySendUserEmailUpdateLink('email@test.com');

    const token = await loginGraphql('email_verified@test.com');

    const response = await request(await getHttpServer())
      .post('/graphql')
      .set('authorization', `Bearer ${token}`)
      .send({
        query,
        variables: { data: body },
      });

    expect(response.body.data.sendUserEmailUpdateLink).toBe(body.email);
  });
});
