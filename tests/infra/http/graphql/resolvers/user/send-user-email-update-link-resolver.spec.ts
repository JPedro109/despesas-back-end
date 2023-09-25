import { GraphQLError } from 'graphql';
import { SendUserEmailUpdateLinkResolver } from '@/infra/http/graphql/resolvers';
import { SendUserEmailUpdateLinkStub } from './stubs';

const makeSut = () => {
  const sendUserEmailUpdateLinkStub = new SendUserEmailUpdateLinkStub();
  const sut = new SendUserEmailUpdateLinkResolver(sendUserEmailUpdateLinkStub);

  return {
    sut,
    sendUserEmailUpdateLinkStub,
  };
};

const makeBody = (id: string, email: string) => {
  return {
    id,
    email,
  };
};

describe('Infra (Resolver) - SendUserEmailUpdateLinkStub', () => {
  test('Should not send user email update link, because use case returned error', async () => {
    const body = makeBody('1', 'email.com');
    const { sut, sendUserEmailUpdateLinkStub } = makeSut();
    jest
      .spyOn(sendUserEmailUpdateLinkStub, 'execute')
      .mockReturnValueOnce(Promise.resolve(new Error('error')));

    await sut
      .handle({ req: { user: body.id } }, { email: body.email })
      .catch((e) => expect(e).toBeInstanceOf(GraphQLError));
  });

  test('Should send user email update link', async () => {
    const body = makeBody('1', 'email@test.com');
    const { sut } = makeSut();

    const result = await sut.handle(
      { req: { user: body.id } },
      { email: body.email },
    );

    expect(result).toEqual(Object(body.id));
  });
});
