import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { ValidationPipeCustom } from '@/shared/custom';
import { HttpModule, DatabaseModule } from '@/infra';
import { DatabaseService, MockRepository } from '@/infra/database/prisma';
import { QueueHelper } from '@/infra/queue/helper';
import * as request from 'supertest';

export const initApp = async () => {
  let module: TestingModule | null = null;
  let app: INestApplication;

  if (!module) {
    module = await Test.createTestingModule({
      imports: [HttpModule, DatabaseModule],
    }).compile();

    app = module.createNestApplication({
      logger: false,
    });
    app.useGlobalPipes(new ValidationPipeCustom());
    await app.init();
  }

  return { app, module };
};

export const before = async (module: TestingModule) => {
  await module.get<DatabaseService>(DatabaseService).connect();
  await module.get<MockRepository>(MockRepository).createMocksToTestRoutes();
  await QueueHelper.connect();
};

export const after = async (app: INestApplication, module: TestingModule) => {
  await module.get<MockRepository>(MockRepository).deleteMocks();
  await module.get<DatabaseService>(DatabaseService).disconnect();
  await QueueHelper.disconnect();
  await app.close();
};

export const getHttpServer = async () => {
  const { app } = await initApp();
  return app.getHttpServer();
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
