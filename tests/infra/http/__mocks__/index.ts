import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { ValidationPipeCustom } from '@/shared/custom';
import { HttpModule, DatabaseModule } from '@/infra';
import { MockRepository } from '@/infra/database/prisma';
import * as request from 'supertest';

let app: INestApplication;

export const setup = async () => {
  let module: TestingModule;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [HttpModule, DatabaseModule],
    }).compile();

    app = module.createNestApplication({
      logger: false,
    });

    app.useGlobalPipes(new ValidationPipeCustom());

    await app.init();
  });

  beforeEach(async () => {
    await module.get<MockRepository>(MockRepository).createMocksToTestRoutes();
  });

  afterEach(async () => {
    await module.get<MockRepository>(MockRepository).deleteMocks();
  });

  afterAll(async () => {
    await app.close();
  });
};

export const getHttpServer = () => {
  return app.getHttpServer();
};

export const loginRest = async (email: string) => {
  return (
    await request(await getHttpServer())
      .post('/api/users/login')
      .send({
        email,
        password: 'Password1234',
      })
  ).body;
};

export const loginGraphql = async (email: string) => {
  return (
    await request(await getHttpServer())
      .post('/graphql')
      .send({
        query:
          'mutation UserLogin($data: UserLoginInput!) { userLogin(data: $data) }',
        variables: {
          data: {
            email,
            password: 'Password1234',
          },
        },
      })
  ).body.data.userLogin;
};
